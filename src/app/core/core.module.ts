import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CollationComponent } from './collation/collation.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [FileUploadComponent, CollationComponent],
  exports: [FileUploadComponent, CollationComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class CoreModule { }
