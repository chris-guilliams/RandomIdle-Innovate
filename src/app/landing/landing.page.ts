import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { ToastController } from '@ionic/angular';
import { GameModelService } from '../services/game-model.service';
import { Observable } from 'rxjs';

declare var PIXI: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {
  private min: Observable<number>;
  private max: Observable<number>;
  public currentCreds: Observable<number>;

  // TODO: Handle Android and iOS height seperately
  private canvasHeight = window.screen.height - 44 - 56;
  private canvasWidth = window.screen.width;
  public app: any;

  constructor(
    private randomNumberService: RandomNumberService,
    private toastController: ToastController,
    private gameModelService: GameModelService) {
      this.currentCreds = this.gameModelService.creds$;
      this.min = this.gameModelService.maxGambleLoss$;
      this.max = this.gameModelService.maxGambleGain$;
  }

  ngOnInit() {

    this.app = new PIXI.Application({width: this.canvasWidth, height: this.canvasHeight});
    const canvas = document.getElementById('landing-page').appendChild(this.app.view);

    this.app.loader.add('../assets/sprites/coin/coin_spritesheet.json').load();
  }

  createCoin(value: number) {
    const coinSheet = this.app.loader.resources['../assets/sprites/coin/coin_spritesheet.json'].spritesheet;
    // create an animated sprite
    const animatedCoin = new PIXI.AnimatedSprite(coinSheet.animations.tile);
    animatedCoin.interactive = true;
    animatedCoin.buttonMode = true;
    animatedCoin.hitArea = new PIXI.Rectangle(-40, -40, 80, 80);
    animatedCoin.on('pointertap', async () => {
      animatedCoin.destroy();
      this.gameModelService.addCreds(value);
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
    const earnings = this.randomNumberService.getRandomNumber(this.gameModelService.maxGambleLoss, this.gameModelService.maxGambleGain);
    this.gameModelService.addCreds(earnings);
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
