import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private _currentCreds = 0;
  private _totalCredsEarned = 0;
  private _totalCredsLost = 0;
  private _netCreds = 0;
  private _minCreditsPerGamble = -1;
  private _maxCreditsPerGamble = 2;

  constructor() { }

  addCreds(creds: number) {
    this._currentCreds += creds;
    creds > 0 ? this._totalCredsEarned += creds : this._totalCredsLost += creds;
    this._netCreds += creds;
  }

  get currentCreds() {
    return this._currentCreds;
  }
}
