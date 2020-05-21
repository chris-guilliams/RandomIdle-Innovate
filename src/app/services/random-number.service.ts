import { Injectable } from '@angular/core';
declare let BigNumber;

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  constructor() { }

  getRandomNumber(min: number, max: number) {
    return Math.floor(BigNumber.random() * (max - min) + min);
  }

}
