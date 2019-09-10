import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class CollatorService {

  textToCollate;
  collatedText: BehaviorSubject<any>;
  collatedText$: Observable<any>;
  variants = {};

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
    var text = this.createAppEntries();
    this.setCollatedText(text);
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
        var appEntry = textDom.createElementNS('http://www.music-encoding.org/ns/mei', 'app'),
            wits = Object.keys(this.variants[n]);
        var appId = 'm' + n + '-app';
        appEntry.setAttribute('xml:id', appId);
        var lem = textDom.createElementNS('http://www.music-encoding.org/ns/mei', 'lem');
        lem.setAttribute('xml:id', appId + '-lem');
        var lemContent = measure.cloneNode(true);
        lem.appendChild(lemContent);
        appEntry.appendChild(lem);
        wits.forEach((wit) => {
          var rdg = textDom.createElementNS('http://www.music-encoding.org/ns/mei', 'rdg');
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
}
