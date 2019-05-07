import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollatorService {

  constructor() {
  }

  collate(baseText, witnesses, names) {
    console.log(baseText, witnesses)
  }
}
