import { Injectable } from '@angular/core';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class CollatorService {

  constructor(
    private upload: UploadService
  ) {
    this.upload.baseText;
    this.upload.witnesses;
  }


}
