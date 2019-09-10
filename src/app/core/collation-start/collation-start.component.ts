import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/shared/upload.service';
import { CollatorService } from 'src/app/shared/collator.service';
import { SpinnerService } from 'src/app/shared/spinner.service';

@Component({
  selector: 'app-collation-start',
  templateUrl: './collation-start.component.html',
  styleUrls: ['./collation-start.component.scss']
})
export class CollationStartComponent implements OnInit, OnDestroy {

  baseText = '';
  witnesses = [];
  witnessesNames = [];
  baseSubscription: Subscription;
  witSubscription: Subscription;
  namesSubscription: Subscription;

  constructor(
    private upload: UploadService,
    private collator: CollatorService,
    private spinner: SpinnerService
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
    this.spinner.setSpinnerStatus(true);
    this.collator.collate(this.baseText, this.witnesses, this.witnessesNames);
    this.spinner.setSpinnerStatus(false);
  }

}
