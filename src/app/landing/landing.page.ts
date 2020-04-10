import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { ToastController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private randomNumberService: RandomNumberService,
    private toastController: ToastController) { }

  async ngOnInit() {
  }

  async gamble() {
    let earnings = this.randomNumberService.getRandomNumber(-50, 50);
    await this.showEarningsToast(earnings);
  }

  async presentEarningsToast(earnings: number) {
    const cssClasses = 'earnings-toast' + ((earnings > 0) ? ' positive' : ' negative');
    const earningsMessage = ((earnings > 0) ? ' Earned: ' : ' Lost: ') + earnings + ' creds';
    const toast = await this.toastController.create({
      message: earningsMessage,
      position: 'bottom',
      cssClass: cssClasses
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
