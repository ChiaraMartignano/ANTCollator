import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseText: BehaviorSubject<any>;
  baseText$: Observable<any>;
  witnesses: BehaviorSubject<any>;
  witnesses$: Observable<any>;
  witnessesNames: BehaviorSubject<any>;
  witnessesNames$: Observable<any>;

  constructor(
    private model: ModelService
  ) {
    this.baseText = new BehaviorSubject('');
    this.baseText$ = this.baseText.asObservable();
    this.witnesses = new BehaviorSubject([]);
    this.witnesses$ = this.witnesses.asObservable();
    this.witnessesNames = new BehaviorSubject([]);
    this.witnessesNames$ = this.witnessesNames.asObservable();
  }

  getBaseText(): Observable<any> {
    return this.baseText$;
  }

  setBaseText(value) {
    this.baseText.next(value);
  }
  
  getWitnesses(): Observable<any> {
    return this.witnesses$;
  }

  setWitnesses(value) {
    this.witnesses.next(value);
  }
  
  getNames(): Observable<any> {
    return this.witnessesNames$;
  }

  setNames(value) {
    this.witnessesNames.next(value);
    this.model.updateWitnesses(value);
  }

  uploadBaseText(baseText) {
    let reader = new FileReader();
    reader.onload = () => {
      this.setBaseText(reader.result);
    };
    reader.readAsText(baseText);
  }

  uploadWitnesses(witnesses) {
    var witnessesTexts = [];
    witnesses.map((witness) => {
      let reader = new FileReader();
      reader.onload = (e) => {
        witnessesTexts.push(reader.result);
      };
      reader.readAsText(witness);
    });
    this.setWitnesses(witnessesTexts);
  }
}
