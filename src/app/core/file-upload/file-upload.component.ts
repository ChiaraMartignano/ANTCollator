import { Component, OnInit } from '@angular/core';
import { StateService } from '../../shared/state.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  baseText;
  witnesses = [];

  constructor(
    private state: StateService
  ) {  }

  ngOnInit() {  }

  addWitness() {
    this.witnesses.push(null);
  }

  removeWitness(index) {
    this.witnesses.splice(index, 1);
  }

  updateBaseText() {
    let input: any = document.getElementById('baseText');
    if (!input) return;
    this.baseText = input.files[0];
  }

  updateWitness(index) {
    let input: any = document.getElementById('witness-' + index);
    if (!input) return;
    this.witnesses[index] = input.files[0];
  }

  uploadFiles() {
    this.state.uploadBaseText(this.baseText);
    this.state.uploadWitnesses(this.witnesses);
  }

}
