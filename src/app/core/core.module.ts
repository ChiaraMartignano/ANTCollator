import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CollationComponent } from './collation/collation.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CollationStartComponent } from './collation-start/collation-start.component';
import { WizardComponent } from './wizard/wizard.component';
import { EditorModule } from '../editor/editor.module';
import { MetadataComponent } from './metadata/metadata.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    CollationComponent,
    CollationStartComponent,
    WizardComponent,
    MetadataComponent,
  ],
  exports: [
    FileUploadComponent,
    CollationComponent,
    CollationStartComponent,
    WizardComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    SharedModule,
    MaterialModule
  ]
})
export class CoreModule { }
