import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameModelService {

  // tslint:disable-next-line:variable-name
  private readonly CREDS = new BehaviorSubject<number>(0);

  readonly creds$ = this.CREDS.asObservable();

  get creds(): number {
    return this.CREDS.getValue();
  }

  set creds(val: number) {
    this.CREDS.next(val);
  }

  addCreds(val: number) {
    this.CREDS.next(this.CREDS.getValue() + val);
  }

  removeCreds(val: number) {
    this.CREDS.next(this.CREDS.getValue() - val);
  }
}
