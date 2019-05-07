import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadService } from 'src/app/shared/upload.service';
import { Subscription } from 'rxjs';
import { CollatorService } from 'src/app/shared/collator.service';

@Component({
  selector: 'app-collation',
  templateUrl: './collation.component.html',
  styleUrls: ['./collation.component.scss']
})
export class CollationComponent implements OnInit, OnDestroy {

  baseText = '';
  witnesses = [];
  baseSubscription: Subscription;
  witSubscription: Subscription;

  constructor(
    private upload: UploadService,
    private collator: CollatorService
  ) { }

  ngOnInit() {
    this.baseSubscription = this.upload.getBaseText().subscribe((data) => {
      this.baseText = data;
    });
    this.witSubscription = this.upload.getWitnesses().subscribe((data) => {
      this.witnesses = data;
    });
  }

  ngOnDestroy() {
    if (this.baseSubscription) {
      this.baseSubscription.unsubscribe();
    }
    if (this.witSubscription) {
      this.witSubscription.unsubscribe();
    }
  }

  startCollation() {
    this.collator.collate(this.baseText, this.witnesses);
  }

}
