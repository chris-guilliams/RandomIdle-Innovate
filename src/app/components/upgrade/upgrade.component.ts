import { Component, OnInit, Input } from '@angular/core';
import { Upgrades } from '../../enums/upgrades';
import { GameModelService } from 'src/app/services/game-model.service';
import { Observable } from 'rxjs';
import { UpgradesService } from 'src/app/services/upgrades.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeComponent implements OnInit {
  @Input() upgradeType: Upgrades;
  @Input() title: string;
  @Input() description: string;

  public rank = 0;
  public currentCreds: Observable<number>;

  constructor(
    private gameModelService: GameModelService,
    private upgradesService: UpgradesService) {
    this.currentCreds = this.gameModelService.creds$;
  }

  ngOnInit() {}

  canUpgrade(): boolean {
    // get upgrade cost
    switch (this.upgradeType) {
      case Upgrades.maxGambleLoss:
        return this.upgradesService.getUpgradeCost(Upgrades.maxGambleLoss, 0) <= this.gameModelService.creds;
      case Upgrades.maxGambleGain:
        return this.upgradesService.getUpgradeCost(Upgrades.maxGambleGain, 0) <= this.gameModelService.creds;
      case Upgrades.maxWager:
        return this.upgradesService.getUpgradeCost(Upgrades.maxWager, 0) <= this.gameModelService.creds;
      default:
        throw new Error('Upgrade not found');
    }
  }

  upgrade() {
    switch (this.upgradeType) {
      case Upgrades.maxGambleLoss:
        this.upgradeMaxGambleLoss(1, 25);
        break;
      case Upgrades.maxGambleGain:
        this.upgradeMaxGambleGain(1, 25);
        break;
      case Upgrades.maxWager:
        this.upgradeMaxWager(1, 25);
        break;
      default:
        throw new Error('Upgrade not found');
    }
  }

  private upgradeMaxWager(delta: number, cost: number) {
    this.gameModelService.updateMaxWager(delta);
    this.gameModelService.updateCreds(-cost);
  }

  private upgradeMaxGambleGain(delta: number, cost: number) {
    this.gameModelService.updateMaxGambleGain(delta);
    this.gameModelService.updateCreds(-cost);
  }

  private upgradeMaxGambleLoss(delta: number, cost: number) {
    this.gameModelService.updateMaxGambleLoss(delta);
    this.gameModelService.updateCreds(-cost);
  }
}
