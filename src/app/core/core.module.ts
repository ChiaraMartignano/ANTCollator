import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CollateButtonComponent } from './collate-button/collate-button.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [FileUploadComponent, CollateButtonComponent, ResultComponent],
  exports: [FileUploadComponent, CollateButtonComponent, ResultComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
