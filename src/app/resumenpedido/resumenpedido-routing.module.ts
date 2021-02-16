import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenpedidoPage } from './resumenpedido.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenpedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenpedidoPageRoutingModule {}
