import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  form = this.fb.group({
    baseText: '',
    witnesses: this.fb.array([])
  });

  get baseText() {
    return this.form.get('baseText') as FormControl;
  }

  get witnesses() {
    return this.form.get('witnesses') as FormArray;
  }

  constructor(
    private fb: FormBuilder
  ) {  }

  ngOnInit() {  }

  addWitness() {
    this.witnesses.push(this.fb.control(''));
  }

  removeWitness(index) {
    this.witnesses.removeAt(index);
  }

}
