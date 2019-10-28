import { Component, OnInit } from '@angular/core';
import { CollatorService, encodingInfo } from 'src/app/shared/collator.service';
import { ModelService } from 'src/app/shared/model.service';
import { UploadService } from 'src/app/shared/upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  metadata: encodingInfo = {
    title: '',
    composer: '',
    lyricist: '',
    editor: '',
    sources: []
  };

  witnessesSubscription: Subscription;
  witnesses: any[];
  bibl: any = {};

  constructor(
    private collator: CollatorService,
    private model: ModelService,
    private upload: UploadService
  ) { }

  ngOnInit() {
    this.witnessesSubscription = this.upload.getNames().subscribe((data) => {
      this.witnesses = data;
    });
  }

  saveMetadata() {
    this.metadata.sources = Object.values(this.bibl);
    this.collator.addMetadata(this.metadata);
    this.model.addMetadata(this.metadata);
  }

  addBibl(wit, event) {
    if (!this.bibl[wit]) {
      this.bibl[wit] = '';
    }
    this.bibl[wit] = event.srcElement.value;
  }

}
