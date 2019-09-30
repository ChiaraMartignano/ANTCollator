import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import SMUFLEditor from '../../../ckeditor5-build-smufl/ckeditor.js';
import { Note } from 'src/app/shared/model.service.js';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit {

  editor;

  @Input() currentNote: Note;
  @Output() changesSaved: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit() {  }
  
  ngAfterViewInit() {
    SMUFLEditor.create(document.querySelector('#editor'), {
      // initialData: this.currentNote.text
    })
    .then( editor => {
      console.log( editor );
      this.editor = editor;
    } )
    .catch( error => {
      console.error( error );
    } );
  }

  saveNote() {
    this.currentNote.text = this.editor.getData();
    console.log(this.currentNote)
    this.changesSaved.emit(true);
  }

  // reset editor after save

}
