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
  
  updateWitnesses(event) {
    let input: any = event.target;
    if (!input) return;
    this.witnesses = [];
    let i = 0;
    while (i < input.files.length) {
      this.witnesses.push(input.files[i]);
      i++;
    }
    this.witnesses.forEach((wit) => {
      var sigla = wit.name.substring(0, wit.name.lastIndexOf('.'));
      sigla = sigla.replace(' ', '');
      this.witnessesNames.push(sigla);
    });
  }

  updateWitnessName(event, index) {
    let input: any = event.target;
    if (!input) return;
    this.witnessesNames[index] = input.value;
  }

  uploadFiles() {
    this.upload.uploadFiles(this.baseText, this.witnesses, this.witnessesNames);
  }

}
