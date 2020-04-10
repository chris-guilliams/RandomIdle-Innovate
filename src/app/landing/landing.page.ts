import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { ToastController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';
import { StatisticsService } from '../services/statistics.service';
import Phaser from 'phaser';
import { MainScene } from '../models/MainScene';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {
  private min = -1;
  private max = 2;
  currentCreds: number;
  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor(
    private randomNumberService: RandomNumberService,
    private statisticsService: StatisticsService,
    private toastController: ToastController) {
      this.config = {
        type: Phaser.AUTO,
        height: 500,
        width: 300,
        scene: [ MainScene ],
        parent: 'game-container',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 100 }
          }
        }
      };
    }

  ngOnInit() {
    this.currentCreds = this.statisticsService.currentCreds;
    this.game = new Phaser.Game(this.config);
  }

  async gamble() {
    const earnings = this.randomNumberService.getRandomNumber(this.min, this.max);
    this.statisticsService.addCreds(earnings);
    this.currentCreds = this.statisticsService.currentCreds;
    await this.showEarningsToast(earnings);
  }

  async presentEarningsToast(earnings: number) {
    let cssClasses = 'earnings-toast';
    let toastMessage = '';
    if (earnings === 0) {
      toastMessage = 'Gained no creds';
    } else if (earnings > 0) {
      cssClasses += ' positive';
      toastMessage = 'Gained: ' + earnings + ' creds';
    } else {
      cssClasses += ' negative';
      toastMessage = 'Lost: ' + Math.abs(earnings) + ' creds';
    }
    const toast = await this.toastController.create({
      message: toastMessage,
      position: 'bottom',
      cssClass: cssClasses,
      duration: 150
    });
    toast.present();
  }

  async showEarningsToast(earnings: number) {
    try {
      this.toastController.dismiss();
    } finally {
      await this.presentEarningsToast(earnings);
    }
  }
}
