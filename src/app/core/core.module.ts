import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ResultComponent } from './result/result.component';
import { CollationComponent } from './collation/collation.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [FileUploadComponent, ResultComponent, CollationComponent],
  exports: [FileUploadComponent, ResultComponent, CollationComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class CoreModule { }
