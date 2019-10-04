import { Component, OnInit } from '@angular/core';
import { CollatorService, encodingInfo } from 'src/app/shared/collator.service';
import { ModelService } from 'src/app/shared/model.service';

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

  constructor(
    private collator: CollatorService,
    private model: ModelService
  ) { }

  ngOnInit() {
  }

  saveMetadata() {
    this.collator.addMetadata(this.metadata);
    this.model.addMetadata(this.metadata);
  }

}
