import { Injectable } from '@angular/core';
import { Upgrades } from './../enums/upgrades';
import * as upgrades from './../data/upgrades.json';

@Injectable({
  providedIn: 'root'
})
export class UpgradesService {
  private upgrades = upgrades;

  constructor() {
  }

  getUpgradeCost(upgradeType: Upgrades, rank: number): number {
    switch (upgradeType) {
      case Upgrades.maxGambleLoss:
        return upgrades.maxGambleLoss[rank].cost;
      case Upgrades.maxGambleGain:
        return upgrades.maxGambleGain[rank].cost;
      case Upgrades.maxWager:
        return upgrades.maxWager[rank].cost;
      default:
        throw new Error('Upgrade cost not found');
    }
  }
}
