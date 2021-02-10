import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaEmpPageRoutingModule } from './categoria-emp-routing.module';

import { CategoriaEmpPage } from './categoria-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaEmpPageRoutingModule
  ],
  declarations: [CategoriaEmpPage]
})
export class CategoriaEmpPageModule {}
