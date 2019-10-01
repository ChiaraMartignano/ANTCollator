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
    var notesDiv = textDom.querySelector('div[type=\'notes\']');
    if (!notesDiv) {
      notesDiv = textDom.createElementNS(this.ns, 'div');
      notesDiv.setAttribute('type', 'notes');
      var list = textDom.createElementNS(this.ns, 'list');
      var head = textDom.createElementNS(this.ns, 'head');
      var headText = textDom.createTextNode('Note d\'apparato');
      head.appendChild(headText);
      list.appendChild(head);
      notesDiv.appendChild(list);
      var mdivs = textDom.querySelectorAll('mdiv');
      var mdiv = mdivs[mdivs.length - 1];
      mdiv.parentNode.appendChild(notesDiv);
    }
  }

  createTEIText(notes) {
    var parser = new DOMParser();
    for (var i = 0; i < notes.length; i++) {
      var htmlText = notes[i].text;
      htmlText = htmlText.replace('&nbsp;', ' ');
      var htmlDom = parser.parseFromString(htmlText, 'text/html');
    }
  }

  convertElements(elem, dom) {
    var newElem;
    switch(elem.tagName) {
      case 'span': {
        if (elem.getAttribute('class') === 'smuflchar') {
          newElem = dom.createElementNS(this.ns, 'symbol');
          newElem.setAttribute('glyph.num', elem.textContent);
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
      case 'i': case 'strong': case 'u': {
        newElem = dom.createElementNS(this.ns, 'hi');
        var rend = 'underline';
        switch (elem.tagName) {
          case 'i': rend = 'italic'; break;
          case 'strong': rend = 'bold'; break;
          default: rend = 'underline';
        }
        newElem.setAttribute('rend', rend);
      } break;
      case 'a': {
        newElem = dom.createElementNS(this.ns, 'ref');
        newElem.setAttribute('target', elem.getAttribute('href'));
      } break;
      default: newElem = elem;
    }
    if (elem.tagName !== 'span') {
      var content = dom.createTextNode(elem.innerHTML);
      newElem.appendChild(content);
    }
  }

  addNotes(notes, text) {

  }

  saveNotes(notes) {
    var parser = new DOMParser(),
        textDom: any = parser.parseFromString(this.text, 'text/xml');
    this.createNotesContainer(textDom);
    this.createTEIText(notes);
    this.addNotes(notes, textDom);
    this.text = textDom.documentElement.outerHTML
    this.setCollatedText(this.text);
  }
}
