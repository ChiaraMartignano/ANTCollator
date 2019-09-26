import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { NotesComponent } from './notes/notes.component';
import { SmuflKeyboardComponent } from './smufl-keyboard/smufl-keyboard.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    TextEditorComponent,
    NotesComponent,
    SmuflKeyboardComponent
  ],
  exports: [
    TextEditorComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EditorModule { }
