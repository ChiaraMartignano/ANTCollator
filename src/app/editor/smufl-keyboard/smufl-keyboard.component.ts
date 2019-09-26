import { Component, OnInit, Input } from '@angular/core';

import GLYPHNAMES from './smufl_glyphnames.js';
import RANGES from './smufl_ranges.js'

@Component({
  selector: 'app-smufl-keyboard',
  templateUrl: './smufl-keyboard.component.html',
  styleUrls: ['./smufl-keyboard.component.scss']
})
export class SmuflKeyboardComponent implements OnInit {

  @Input() editor;

  ranges = RANGES;
  glyphnames = GLYPHNAMES;
  rangesArray = Object.keys(RANGES);
  currentRange = RANGES['medievalAndRenaissanceIndividualNotes'];
  currentRangeIndex = this.rangesArray.indexOf('medievalAndRenaissanceIndividualNotes');

  constructor() { }

  ngOnInit() {
  }

  setGlyph(codepoint) {
    return String.fromCodePoint(Number.parseInt('0x' + codepoint.slice(2)));
  }

  changeRange(direction) {
    if (this.currentRangeIndex === 0 || this.currentRangeIndex === this.rangesArray.length - 1) {
      return;
    }
    this.currentRangeIndex = direction === 'next' ? this.currentRangeIndex + 1 : this.currentRangeIndex - 1;
    this.currentRange = this.ranges[this.rangesArray[this.currentRangeIndex]];
  }

  selectChar(codepoint) {
    this.editor.execute('smuflchar', { value: codepoint });
  }

}
