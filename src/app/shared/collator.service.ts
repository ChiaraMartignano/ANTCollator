import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class CollatorService {

  textToCollate;
  text;
  collatedText: BehaviorSubject<any>;
  collatedText$: Observable<any>;
  variants = {};
  ns = 'http://www.music-encoding.org/ns/mei';

  constructor(
    private model: ModelService
  ) {
    this.collatedText = new BehaviorSubject('');
    this.collatedText$ = this.collatedText.asObservable();
  }

  getCollatedText(): Observable<any> {
    return this.collatedText$;
  }

  setCollatedText(value) {
    this.collatedText.next(value);
  }

  collate(baseText, witnesses, names) {
    this.textToCollate = baseText.substring(0, baseText.length - 1);
    this.findVariants(witnesses, names);
    this.text = this.createAppEntries();
    this.setCollatedText(this.text);
  }

  findVariants(wits, names) {
    var parser = new DOMParser();
    wits.forEach((wit, i) => {
      var witDom = parser.parseFromString(wit, 'text/xml'),
          measures = witDom.querySelectorAll('measure');
      measures.forEach((measure) => {
        if (!this.isMeasureEmpty(measure)) {
          var n = measure.getAttribute('n');
          if (!this.variants[n]) this.variants[n] = {};
          this.variants[n][names[i]] = measure;
        }
      });
    });
  }

  isMeasureEmpty(measure) {
    var notes = measure.querySelectorAll('note');
    var rests = measure.querySelectorAll('rests');
    return notes.length < 1 && rests.length < 1;
  }

  createAppEntries() {
    var parser = new DOMParser(),
        textDom: any = parser.parseFromString(this.textToCollate, 'text/xml'),
        measures = textDom.querySelectorAll('measure'),
        measuresWithVariants = Object.keys(this.variants);
    measures.forEach((measure) => {
      var n = measure.getAttribute('n');
      if (measuresWithVariants.indexOf(n) >= 0) {
        var appEntry = textDom.createElementNS(this.ns, 'app'),
            wits = Object.keys(this.variants[n]);
        var appId = 'm' + n + '-app';
        appEntry.setAttribute('xml:id', appId);
        var lem = textDom.createElementNS(this.ns, 'lem');
        lem.setAttribute('xml:id', appId + '-lem');
        var lemContent = measure.cloneNode(true);
        lem.appendChild(lemContent);
        appEntry.appendChild(lem);
        wits.forEach((wit) => {
          var rdg = textDom.createElementNS(this.ns, 'rdg');
          rdg.setAttribute('source', '#' + wit);
          rdg.setAttribute('xml:id', appId + '-rdg-' + wit)
          var rdgContent = this.variants[n][wit].cloneNode(true);
          rdg.appendChild(rdgContent);
          appEntry.appendChild(rdg);
        });
        this.model.createAppEntryModel(appId, wits);
        measure.parentNode.replaceChild(appEntry, measure);
      }
    });
    var schema = `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-model href="http://music-encoding.org/schema/4.0.0/mei-all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>
    <?xml-model href="http://music-encoding.org/schema/4.0.0/mei-all.rng" type="application/xml" schematypens="http://purl.oclc.org/dsdl/schematron"?>`;
    return schema + textDom.documentElement.outerHTML;
  }

  createNotesContainer(textDom) {
    var notesDiv = textDom.querySelector('div[type=\'notes\']'),
      list;
    if (!notesDiv) {
      notesDiv = textDom.createElementNS(this.ns, 'div');
      notesDiv.setAttribute('type', 'notes');
      list = textDom.createElementNS(this.ns, 'list');
      var head = textDom.createElementNS(this.ns, 'head');
      var headText = textDom.createTextNode('Note d\'apparato');
      head.appendChild(headText);
      list.appendChild(head);
      notesDiv.appendChild(list);
      var mdivs = textDom.querySelectorAll('mdiv');
      var mdiv = mdivs[mdivs.length - 1];
      mdiv.parentNode.appendChild(notesDiv);
    } else {
      list = notesDiv.querySelector('list');
      for (var i = list.children.length - 1; i > 0; i--) {
        list.removeChild(list.children[i]);
      }
    }
    return list;
  }
  
  addNotes(notes, list, dom) {
    for (var i = 0; i < notes.length; i++) {
      var item = dom.createElementNS(this.ns, 'item');
      var num = dom.createElementNS(this.ns, 'num');
      num.setAttribute('corresp', 'm' + notes[i].measure + '-app');
      var number = dom.createTextNode(notes[i].measure);
      num.appendChild(number);
      item.appendChild(num);
      if (!notes[i].tei) {
        notes[i].tei = this.createTEIText(notes[i], dom);
      }
      item.appendChild(notes[i].tei);
      list.appendChild(item);
    }
  }

  createTEIText(note, teiDom) {
    var parser = new DOMParser();
    var htmlText = note.text.replace('&nbsp;', ' ');
    var htmlDom = parser.parseFromString(htmlText, 'text/html');
    var body = htmlDom.querySelector('body');
    var teiElem = this.createTEINode(body, teiDom);
    return teiElem;
  }

  createTEINode(elem, dom) {
    var node = this.convertElements(elem, dom);
    if (node.tagName.toLowerCase() !== 'symbol') {
      for (var i = 0; i < elem.childNodes.length; i++) {
        var child;
        if (elem.childNodes[i].nodeType === 3) {
          child = dom.createTextNode(elem.childNodes[i].textContent)
        } else if (elem.childNodes[i].nodeType === 1) {
          child = this.createTEINode(elem.childNodes[i], dom);
        }
        if (child) { node.appendChild(child); }
      }
    }
    return node;
  }

  convertElements(elem, dom) {
    var newElem;
    switch(elem.tagName.toLowerCase()) {
      case 'body': {
        newElem = dom.createElementNS(this.ns, 'p');
      } break;
      case 'span': {
        if (elem.getAttribute('class') === 'smuflchar') {
          newElem = dom.createElementNS(this.ns, 'symbol');
          var num = elem.textContent.codePointAt(0).toString(16);
          newElem.setAttribute('glyph.num', 'U+' + num);
        }
      } break;
      case 'ul': case 'ol': {
        newElem = dom.createElementNS(this.ns, 'list');
        var rend = elem.tagName === 'ul' ? 'bulleted' : 'numbered';
        newElem.setAttribute('rend', rend);
      } break;
      case 'li': {
        newElem = dom.createElementNS(this.ns, 'item');
      } break;
      case 'i': case 'strong': case 'u': case 'sub': case 'sup': {
        newElem = dom.createElementNS(this.ns, 'hi');
        newElem.setAttribute('rend', elem.tagName.toLowerCase());
      } break;
      case 'a': {
        newElem = dom.createElementNS(this.ns, 'ref');
        newElem.setAttribute('target', elem.getAttribute('href'));
      } break;
      default: newElem = dom.createElementNS(this.ns, elem.tagName.toLowerCase());
    }
    return newElem;
  }

  saveNotes(notes) {
    var parser = new DOMParser(),
        textDom: any = parser.parseFromString(this.text, 'text/xml');
    var list = this.createNotesContainer(textDom);
    this.addNotes(notes, list, textDom);
    this.text = textDom.documentElement.outerHTML
    this.setCollatedText(this.text);
  }
}
