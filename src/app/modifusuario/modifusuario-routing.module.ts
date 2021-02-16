import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifusuarioPage } from './modifusuario.page';

const routes: Routes = [
  {
    path: '',
    component: ModifusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifusuarioPageRoutingModule {}
