import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export class ClearAuthFormService {
  private clearFormSource = new Subject<boolean>();
  clearForm$ = this.clearFormSource.asObservable();

  clearForm() {
    this.clearFormSource.next(true);
  }
}
