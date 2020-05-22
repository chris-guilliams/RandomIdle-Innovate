import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.page.html',
  styleUrls: ['./upgrades.page.scss'],
})
export class UpgradesPage implements OnInit {
  public currentCreds: number;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.currentCreds = this.statisticsService.currentCreds;
  }

}
