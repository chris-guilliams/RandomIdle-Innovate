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
  private min = -1;
  private max = 3;
  private canvasHeight = window.screen.height - 44 - 56;
  private canvasWidth = window.screen.width;
  private credsToAdd: number[] = [];
  public app: any;
  public container: any = new PIXI.Container();
  public currentCreds: number;

  constructor(
    private randomNumberService: RandomNumberService,
    private statisticsService: StatisticsService,
    private toastController: ToastController) {
  }

  ngOnInit() {
    this.currentCreds = this.statisticsService.currentCreds;

    this.app = new PIXI.Application({width: this.canvasWidth, height: this.canvasHeight});
    const leftPanel = document.getElementById('landing-page').appendChild(this.app.view);

    PIXI.Loader.shared.add('../assets/sprites/coin/coin_spritesheet.json').load();
  }

  createCoin(x: number, y: number, value: number) {
    const coinSheet = PIXI.Loader.shared.resources['../assets/sprites/coin/coin_spritesheet.json'].spritesheet;
    // create an animated sprite
    const animatedCoin = new PIXI.AnimatedSprite(coinSheet.animations.tile);
    animatedCoin.x = x;
    animatedCoin.y = y;
    // set speed, start playback and add it to the stage
    animatedCoin.animationSpeed = 0.1;
    animatedCoin.play();
    this.app.stage.addChild(animatedCoin);
  }

  async gamble() {
    const earnings = this.randomNumberService.getRandomNumber(this.min, this.max);
    this.statisticsService.addCreds(earnings);
    this.currentCreds = this.statisticsService.currentCreds;
    this.credsToAdd.push(earnings);
    await this.showEarningsToast(earnings);
    const x = this.randomNumberService.getRandomNumber(0, this.canvasWidth);
    const y = this.randomNumberService.getRandomNumber(0, this.canvasHeight);
    this.createCoin(x, y, 50);
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
