import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollatorService } from 'src/app/shared/collator.service';
import { ModelService } from 'src/app/shared/model.service';

@Component({
  selector: 'app-collation',
  templateUrl: './collation.component.html',
  styleUrls: ['./collation.component.scss']
})
export class CollationComponent implements OnInit, OnDestroy {

  textSubscription: Subscription;
  collatedText;
  model;

  constructor(
    private collator: CollatorService,
    private modelService: ModelService,
  ) { }

  ngOnInit() {
    this.textSubscription = this.collator.getCollatedText().subscribe((data) => {
      this.collatedText = data;
    });
    this.model = this.modelService.getModel();
  }

  ngOnDestroy() {
    if (this.textSubscription) {
      this.textSubscription.unsubscribe();
    }
  }

  copyToClipboard(text) {
    if (typeof text !== 'string') {
      text = JSON.stringify(text);
    }
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

}
