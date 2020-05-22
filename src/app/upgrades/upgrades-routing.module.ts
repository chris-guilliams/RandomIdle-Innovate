import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpgradesPage } from './upgrades.page';

const routes: Routes = [
  {
    path: '',
    component: UpgradesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradesPageRoutingModule {}
