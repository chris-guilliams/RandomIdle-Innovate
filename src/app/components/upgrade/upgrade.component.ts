import { Component, OnInit, Input } from '@angular/core';
import { Upgrades } from '../../enums/upgrades';
import { GameModelService } from 'src/app/services/game-model.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeComponent implements OnInit {
  @Input() upgradeType: Upgrades;
  public currentCreds: Observable<number>;

  constructor(private gameModelService: GameModelService) {
    this.currentCreds = this.gameModelService.creds$;
  }

  ngOnInit() {}

  canUpgrade(): boolean {
    switch (this.upgradeType) {
      case Upgrades.maxGambleLoss:
        return this.upgradeMaxGambleLoss(1, 25);
      case Upgrades.maxGambleGain:
        return this.upgradeMaxGambleGain(1, 25);
      case Upgrades.maxWager:
        return this.upgradeMaxWager(1, 25);
      default:
        throw new Error('Upgrade not found');
    }
  }

  upgrade(): boolean {
    switch (this.upgradeType) {
      case Upgrades.maxGambleLoss:
        return this.upgradeMaxGambleLoss(1, 25, true);
      case Upgrades.maxGambleGain:
        return this.upgradeMaxGambleGain(1, 25, true);
      case Upgrades.maxWager:
        return this.upgradeMaxWager(1, 25, true);
      default:
        throw new Error('Upgrade not found');
    }
  }

  private upgradeMaxWager(delta: number, cost: number, purchase: boolean = false): boolean {
    if (this.gameModelService.creds >= cost && purchase) {
      this.gameModelService.updateMaxWager(delta);
      console.log('upgrade');
      
      return true;
    } else {
      return this.gameModelService.creds >= cost ? false : true;
    }
  }

  private upgradeMaxGambleGain(delta: number, cost: number, purchase: boolean = false): boolean {
    if (this.gameModelService.creds >= cost && purchase) {
      this.gameModelService.updateMaxGambleGain(delta);
      return true;
    } else {
      return this.gameModelService.creds >= cost ? false : true;
    }
  }

  private upgradeMaxGambleLoss(delta: number, cost: number, purchase: boolean = false): boolean {
    if (this.gameModelService.creds >= cost && purchase) {
      this.gameModelService.updateMaxGambleLoss(delta);
      return true;
    } else {
      return this.gameModelService.creds >= cost ? false : true;
    }
  }
}
