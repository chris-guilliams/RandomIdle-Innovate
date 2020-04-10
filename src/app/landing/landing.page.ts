import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { ToastController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';
import { StatisticsService } from '../services/statistics.service';
import Phaser from 'phaser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {
  private min = -1;
  private max = 2;
  private credsToAdd: number[] = [];
  currentCreds: number;
  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  height = 500;
  width = 300;

  constructor(
    private randomNumberService: RandomNumberService,
    private statisticsService: StatisticsService,
    private toastController: ToastController) {
      const that = this;
      this.config = {
        type: Phaser.AUTO,
        height: that.height,
        width: that.width,
        scene: {
          preload() {
            that.preloadScene(this);
          },
          create() {
            that.createScene(this);
          },
          update() {
            that.updateScene(this);
          }
        },
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
    this.credsToAdd.push(earnings);
    console.log(this.credsToAdd);
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

  preloadScene(scene: Phaser.Scene) {
    scene.load.spritesheet('coin', 'assets/sprites/coin_spritesheet.png', { frameWidth: 22, frameHeight: 22 });
  }

  createScene(scene: Phaser.Scene) {
    const rotateConfig = {
      key: 'rotateAnimation',
      frames: scene.anims.generateFrameNumbers('coin', {}),
      frameRate: 6,
      repeat: -1
    };
    scene.anims.create(rotateConfig);

    scene.add.sprite(100, 100, 'coin').play('rotateAnimation');
  }

  updateScene(scene: Phaser.Scene) {
    const credsToAdd = this.credsToAdd.pop();
    if (credsToAdd > 0) {
      const x = this.randomNumberService.getRandomNumber(0, this.height);
      const y = this.randomNumberService.getRandomNumber(0, this.width);
      let coin = scene.add.sprite(x, y, 'coin').play('rotateAnimation');
    }
  }
}
