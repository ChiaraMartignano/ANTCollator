import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [
    TextEditorComponent,
    NotesComponent
  ],
  exports: [
    TextEditorComponent,
    NotesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditorModule { }
