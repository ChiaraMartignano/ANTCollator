import { Component, OnInit, AfterViewInit } from '@angular/core';
import SMUFLEditor from '../../../ckeditor5-build-smufl/ckeditor.js';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit {

  editor;

  constructor() { }

  ngOnInit() {  }
  
  ngAfterViewInit() {
    SMUFLEditor.create(document.querySelector('#editor'))
    .then( editor => {
      console.log( editor );
      this.editor = editor;
    } )
    .catch( error => {
      console.error( error );
    } );
  }

}
