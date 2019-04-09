import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CollateButtonComponent } from './collate-button/collate-button.component';
import { ResultComponent } from './result/result.component';
import { CollationComponent } from './collation/collation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FileUploadComponent, CollateButtonComponent, ResultComponent, CollationComponent],
  exports: [FileUploadComponent, CollateButtonComponent, ResultComponent, CollationComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
