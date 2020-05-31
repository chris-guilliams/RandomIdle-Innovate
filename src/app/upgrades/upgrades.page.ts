import { Component, OnInit } from '@angular/core';
import { GameModelService } from '../services/game-model.service';
import { Observable } from 'rxjs';
import { Upgrades } from '../enums/upgrades';

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.page.html',
  styleUrls: ['./upgrades.page.scss'],
})
export class UpgradesPage implements OnInit {
  public upgrades = Upgrades;
  public currentCreds: Observable<number>;

  constructor(private gameModelService: GameModelService) {
    this.currentCreds = this.gameModelService.creds$;
  }

  ngOnInit() {}

}
