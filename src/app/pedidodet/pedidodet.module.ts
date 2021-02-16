import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidodetPageRoutingModule } from './pedidodet-routing.module';

import { PedidodetPage } from './pedidodet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidodetPageRoutingModule
  ],
  declarations: [PedidodetPage]
})
export class PedidodetPageModule {}
