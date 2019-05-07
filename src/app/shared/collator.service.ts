import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollatorService {

  constructor() {
  }

  collate(baseText, witnesses) {
    console.log(baseText, witnesses)
  }
}
