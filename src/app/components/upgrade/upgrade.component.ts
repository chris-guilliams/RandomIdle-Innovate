import { Component, OnInit } from '@angular/core';
import { Upgrades } from '../../enums/upgrades';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  upgrade(upgrade: Upgrades) {
    switch (upgrade) {
      case Upgrades.minGamble:
          // increase minGamble
        break;
      case Upgrades.maxGamble:
        // increas maxGamble
        break;
      default:
        throw new Error('Upgrade not found');
    }
  }

}
