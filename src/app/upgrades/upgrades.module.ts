import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradesPageRoutingModule } from './upgrades-routing.module';

import { UpgradesPage } from './upgrades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpgradesPageRoutingModule
  ],
  declarations: [UpgradesPage]
})
export class UpgradesPageModule {}
