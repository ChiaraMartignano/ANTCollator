import { Injectable } from '@angular/core';
import { encodingInfo } from '../shared/collator.service';

export interface Model {
  baseText: string,
  witnesses: string[],
  appEntries: {
    _indexes: string[],
  },
  notes: {
    _indexes: string[]
  },
  encodingInfo: encodingInfo
}

export interface AppEntry {
  id: string,
  lem: string,
  rdgs: {
    _indexes: string[],
    _wits: string[]
  }
  _hasNote: boolean
}

export interface Rdg {
  id: string,
  wit: string
}

export interface Note {
  measure: string,
  text: string,
  tei?: string
}

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  model: Model = {
    baseText: '',
    witnesses: [],
    appEntries: {
      _indexes: [],
    },
    notes: {
      _indexes: []
    },
    encodingInfo: {
      title: '',
      composer: '',
      editor: '',
      lyricist: '',
      sources: []
    }
  }

  constructor() { }

  getModel() {
    return this.model;
  }

  updateWitnesses(witsNames) {
    this.model.witnesses = witsNames;
    console.log(this.model);
  }

  addAppEntry(entry) {
    this.model.appEntries._indexes.push(entry.id);
    this.model.appEntries[entry.id] = entry;
  }

  createAppEntryModel(appId, wits) {
    var entry: AppEntry = {
      id: appId,
      lem: appId + '-lem',
      rdgs: {
        _indexes: [],
        _wits: wits
      },
      _hasNote: false
    };
    wits.forEach((wit) => {
      var rdg: Rdg = {
        id: appId + '-rdg-' + wit,
        wit
      }
      entry.rdgs._indexes.push(rdg.id);
      entry.rdgs[rdg.id] = rdg;
    });
    this.addAppEntry(entry);
  }

  saveNotes(notes) {
    this.model.notes = { _indexes: [] };
    for (var i = 0; i <  notes.length; i++) {
      this.addNote(notes[i]);
    }
  }
  
  addNote(note) {
    var measure = "m" + note.measure.trim() + '-app';
    this.model.notes[measure] = note;
    this.model.notes._indexes.push(measure);
    if (this.model.appEntries._indexes.indexOf(measure) >= 0) {
      this.model.appEntries[measure]._hasNote = true;
    }
  }

  addMetadata(data: encodingInfo) {
    this.model.encodingInfo = data;
  }

}
