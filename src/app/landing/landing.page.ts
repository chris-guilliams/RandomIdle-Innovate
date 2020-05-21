import { Component, OnInit, AfterViewInit } from '@angular/core';
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

    this.app = new PIXI.Application({width: window.screen.width, height: window.screen.height - 44 - 56});
    const leftPanel = document.getElementById('landing-page').appendChild(this.app.view);

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
    });
    const basicText = new PIXI.Text('RandomIdle', style);
    basicText.x = 30;
    basicText.y = 90;

    this.app.stage.addChild(this.container);
    this.container.addChild(basicText);
  }

  async gamble() {
    const earnings = this.randomNumberService.getRandomNumber(this.min, this.max);
    this.statisticsService.addCreds(earnings);
    this.currentCreds = this.statisticsService.currentCreds;
    this.credsToAdd.push(earnings);
    await this.showEarningsToast(earnings);
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
