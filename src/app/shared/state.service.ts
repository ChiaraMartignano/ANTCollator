import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  baseText;
  witnesses;

  constructor() { }

  uploadBaseText(baseText) {
    let reader = new FileReader();
    reader.onload = () => {
      this.baseText = reader.result;
      console.log(this.baseText);
    };
    reader.readAsText(baseText);
  }

  uploadWitnesses(witnesses) {
    this.witnesses = [];
    witnesses.map((witness) => {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(reader.result);
        this.witnesses.push(reader.result);
      };
      reader.readAsText(witness);
    });
  }
}
