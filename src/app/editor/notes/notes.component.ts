import { Component, OnInit } from '@angular/core';
import { Note, ModelService } from '../../shared/model.service';
import { CollatorService } from '../../shared/collator.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  currentlyEditedNote: Note;
  notes: Note[] = [];

  constructor(
    private model: ModelService,
    private collator: CollatorService
  ) { }

  ngOnInit() {
  }

  addNote() {
    var newNote: Note = {
      measure: '',
      text: ''
    }
    this.notes.push(newNote);
    this.currentlyEditedNote = this.notes[this.notes.length - 1];
  }

  removeNote(note: Note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }

  editNote(note: Note) {
    this.currentlyEditedNote = note;
  }

  onSaveNoteChanges() {
    this.currentlyEditedNote = null;
    console.log(this.currentlyEditedNote);
  }

  saveAllNotes() {
    console.log('save notes');
  }

}
