import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadService } from 'src/app/shared/upload.service';
import { Subscription } from 'rxjs';
import { CollatorService } from 'src/app/shared/collator.service';
import { ModelService } from 'src/app/shared/model.service';

@Component({
  selector: 'app-collation',
  templateUrl: './collation.component.html',
  styleUrls: ['./collation.component.scss']
})
export class CollationComponent implements OnInit, OnDestroy {

  baseText = '';
  witnesses = [];
  witnessesNames = [];
  baseSubscription: Subscription;
  witSubscription: Subscription;
  namesSubscription: Subscription;
  collatedText;
  model;

  constructor(
    private upload: UploadService,
    private collator: CollatorService,
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.baseSubscription = this.upload.getBaseText().subscribe((data) => {
      this.baseText = data;
    });
    this.witSubscription = this.upload.getWitnesses().subscribe((data) => {
      this.witnesses = data;
    });
    this.namesSubscription = this.upload.getNames().subscribe((data) => {
      this.witnessesNames = data;
    });
  }

  ngOnDestroy() {
    if (this.baseSubscription) {
      this.baseSubscription.unsubscribe();
    }
    if (this.witSubscription) {
      this.witSubscription.unsubscribe();
    }
    if (this.namesSubscription) {
      this.namesSubscription.unsubscribe();
    }
  }

  startCollation() {
    this.collatedText = this.collator.collate(this.baseText, this.witnesses, this.witnessesNames);
    this.model = this.modelService.getModel();
  }

}
