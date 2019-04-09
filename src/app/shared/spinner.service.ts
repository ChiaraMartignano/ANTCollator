import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  spinnerStatus: BehaviorSubject<boolean>;
  spinnerStatus$: Observable<boolean>;

  /**
   * When initialised, the spinner active state is set to false.
   */
  constructor() {
      this.spinnerStatus = new BehaviorSubject(false);
      this.spinnerStatus$ = this.spinnerStatus.asObservable();
  }

  /**
   * Returns the state of the spinner as an observable.
   */
  getSpinnerStatus() {
      return this.spinnerStatus$;
  }

  /**
   * Updates the state of the spinner.
   * @param value{boolean} the value the spinner has to be set to
   */
  setSpinnerStatus(value: boolean) {
      this.spinnerStatus.next(value);
  }
}
