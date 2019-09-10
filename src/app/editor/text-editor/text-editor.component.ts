import { Component, OnInit, AfterViewInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {  }
  
  ngAfterViewInit() {
    ClassicEditor.create(document.querySelector('#editor'))
    .then( editor => {
      console.log( editor );
    } )
    .catch( error => {
      console.error( error );
    } );
  }

}
