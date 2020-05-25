import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { ToastController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';
import { StatisticsService } from '../services/statistics.service';

declare var PIXI: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {
  // TODO: Break into state service???
  private min = -3;
  private max = 3;

  // TODO: Handle Android and iOS height seperately
  private canvasHeight = window.screen.height - 44 - 56;
  private canvasWidth = window.screen.width;
  public app: any;
  public currentCreds: number;

  constructor(
    private randomNumberService: RandomNumberService,
    private statisticsService: StatisticsService,
    private toastController: ToastController) {
  }

  ngOnInit() {
    this.currentCreds = this.statisticsService.currentCreds;

    this.app = new PIXI.Application({width: this.canvasWidth, height: this.canvasHeight});
    const canvas = document.getElementById('landing-page').appendChild(this.app.view);

    this.app.loader.add('../assets/sprites/coin/coin_spritesheet.json').load();
  }

  createCoin(value: number) {
    const coinSheet = this.app.loader.resources['../assets/sprites/coin/coin_spritesheet.json'].spritesheet;
    // create an animated sprite
    const animatedCoin = new PIXI.AnimatedSprite(coinSheet.animations.tile);
    animatedCoin.interactive = true;
    animatedCoin.buttonMode = true;4
    animatedCoin.hitArea = new PIXI.Rectangle(-40, -40, 80, 80);
    animatedCoin.on('pointertap', async () => {
      animatedCoin.destroy();
      this.statisticsService.addCreds(value);
      this.currentCreds = this.statisticsService.currentCreds;
      await this.showEarningsToast(value);
    });
    const x = this.randomNumberService.getRandomNumber(15, this.canvasWidth - 15);
    const y = this.randomNumberService.getRandomNumber(15, this.canvasHeight - 15);
    animatedCoin.x = x;
    animatedCoin.y = y;
    // set speed, start playback and add it to the stage
    animatedCoin.animationSpeed = 0.1;
    animatedCoin.play();
    this.app.stage.addChild(animatedCoin);
  }

  // TODO: Add cooldown between gambling
  async gamble() {
    const earnings = this.randomNumberService.getRandomNumber(this.min, this.max);
    this.statisticsService.addCreds(earnings);
    this.currentCreds = this.statisticsService.currentCreds;
    if (earnings !== 0) {
      this.showEarningsToast(earnings);
    }

    // TODO: You shouldn't be able to get your full earnings back
    if (earnings > 0) {
      this.createCoin(Math.abs(earnings));
    }
  }

  async presentEarningsToast(earnings: number) {
    let cssClasses = 'earnings-toast';
    let toastMessage = '';
    if (earnings === 0) {
      toastMessage = 'Gained: 0 creds';
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
      await this.toastController.dismiss();
    } catch (e) {
      if (e !== 'overlay does not exist') {
        throw new Error(e);
      }
    } finally {
      await this.presentEarningsToast(earnings);
    }
  }
}
