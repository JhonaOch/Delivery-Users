import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productos:any[];

  constructor(public car: CarritoService) { }

  ngOnInit() {
    this.recuperarCarrito();
  

  }


  async recuperarCarrito(){
    await this.car.recuperarCariito().then(promesa=>{
      console.log("llego al carrito")
      const aux = promesa;
      this.productos = aux;
      console.log(this.productos);
    })
  }

}
