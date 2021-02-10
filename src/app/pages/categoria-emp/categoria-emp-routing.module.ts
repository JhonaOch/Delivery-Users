import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaEmpPage } from './categoria-emp.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaEmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaEmpPageRoutingModule {}
