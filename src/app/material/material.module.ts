import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    DragDropModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
