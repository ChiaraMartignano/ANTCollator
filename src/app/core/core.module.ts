import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CollateButtonComponent } from './collate-button/collate-button.component';
import { ResultComponent } from './result/result.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FileUploadComponent, CollateButtonComponent, ResultComponent],
  exports: [FileUploadComponent, CollateButtonComponent, ResultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
