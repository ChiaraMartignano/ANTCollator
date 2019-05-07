import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../shared/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  baseText;
  witnesses = [];
  witnessesNames = [];

  constructor(
    private upload: UploadService
  ) {  }

  ngOnInit() {  }

  addWitness() {
    this.witnesses.push(null);
    this.witnessesNames.push(null);
  }

  removeWitness(index) {
    this.witnesses.splice(index, 1);
    this.witnessesNames.splice(index, 1);
  }

  updateBaseText(event) {
    let input: any = event.target;
    if (!input) return;
    this.baseText = input.files[0];
  }

  updateWitness(event, index) {
    let input: any = event.target;
    if (!input) return;
    this.witnesses[index] = input.files[0];
    var sigla = input.files[0].name.substring(0, input.files[0].name.lastIndexOf('.'));
    this.witnessesNames[index] = sigla;
  }

  updateWitnessName(event, index) {
    let input: any = event.target;
    if (!input) return;
    this.witnessesNames[index] = input.value;
  }

  uploadFiles() {
    this.upload.uploadBaseText(this.baseText);
    this.upload.uploadWitnesses(this.witnesses);
  }

}
