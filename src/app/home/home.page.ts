import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  opciones={
    slidesPerView:2,
    freeMode:true,
    pagination:false
  }

  ngOnInit() {
  }

  constructor(public AFauth:AuthService){}

  salir(){
    console.log("salir de la sesion")
    this.AFauth.logout();
    
  }



}
