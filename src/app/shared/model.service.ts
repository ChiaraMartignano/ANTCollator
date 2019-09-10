import { Injectable } from '@angular/core';

export interface Model {
  baseText: string,
  witnesses: string[],
  appEntries: {
    _indexes: string[]
  }
}

export interface AppEntry {
  id: string,
  lem: string,
  rdgs: {
    _indexes: string[],
    _wits: string[]
  }
}

export interface Rdg {
  id: string,
  wit: string
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
      }
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
}
