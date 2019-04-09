import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  /** Observable of the boolean that states if the spinner is active. */
  spinnerActive: Observable<boolean>;

  constructor(
    private service: SpinnerService
  ) { }

  /** On init the spinner active Observable is retrieved from the service. */
  ngOnInit() {
    this.spinnerActive = this.service.getSpinnerStatus();
  }
}
