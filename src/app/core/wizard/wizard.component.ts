import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/shared/upload.service';
import { CollatorService } from 'src/app/shared/collator.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, OnDestroy {

  isLinear = false;
  uploadSubscription: Subscription;
  isUploadComplete = false;
  collationSubscription: Subscription;
  isCollationComplete = false;

  constructor(
    private upload: UploadService,
    private collator: CollatorService
  ) { }

  ngOnInit() {
    this.uploadSubscription = this.upload.getFilesUploaded().subscribe((data) => {
      this.isUploadComplete = data;
    });
    this.collationSubscription = this.collator.getCollatedText().subscribe((data) => {
      this.isCollationComplete = data ? true : false;
    });
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
    if (this.collationSubscription) {
      this.collationSubscription.unsubscribe();
    }
  }

}
