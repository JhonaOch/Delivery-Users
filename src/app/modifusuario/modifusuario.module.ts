import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifusuarioPageRoutingModule } from './modifusuario-routing.module';

import { ModifusuarioPage } from './modifusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifusuarioPageRoutingModule
  ],
  declarations: [ModifusuarioPage]
})
export class ModifusuarioPageModule {}
