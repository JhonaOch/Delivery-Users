import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenpedidoPageRoutingModule } from './resumenpedido-routing.module';

import { ResumenpedidoPage } from './resumenpedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenpedidoPageRoutingModule
  ],
  declarations: [ResumenpedidoPage]
})
export class ResumenpedidoPageModule {}
