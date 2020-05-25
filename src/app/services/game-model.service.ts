import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameModelService {

  // TODO: instead of individual observables would it be better to have
  // a single object to subscribe too with all the values? Opt out vs. opt in

  // tslint:disable:variable-name
  private readonly _creds = new BehaviorSubject<number>(0);
  private readonly _maxGambleLoss = new BehaviorSubject<number>(-2);
  private readonly _maxGambleGain = new BehaviorSubject<number>(4);
  private readonly _maxWager = new BehaviorSubject<number>(5);
  // tslint:enable:variable-name

  readonly creds$ = this._creds.asObservable();
  readonly maxGambleLoss$ = this._maxGambleLoss.asObservable();
  readonly maxGambleGain$ = this._maxGambleGain.asObservable();
  readonly maxWager$ = this._maxWager.asObservable();

  get creds(): number {
    return this._creds.getValue();
  }

  set creds(val: number) {
    this._creds.next(val);
  }

  addCreds(val: number) {
    this._creds.next(this._creds.getValue() + val);
  }

  removeCreds(val: number) {
    this._creds.next(this._creds.getValue() - val);
  }

  get maxGambleLoss(): number {
    return this._maxGambleLoss.getValue();
  }

  set maxGambleLoss(val: number) {
    this._maxGambleLoss.next(val);
  }

  get maxGambleGain(): number {
    return this._maxGambleGain.getValue();
  }

  set maxGambleGain(val: number) {
    this._maxGambleGain.next(val);
  }

  get maxWager(): number {
    return this._maxWager.getValue();
  }

  set maxWager(val: number) {
    this._maxWager.next(val);
  }
}
