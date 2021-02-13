import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Pedido } from '../../model/pedido';
import { Product } from '../../model/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  pedido : Pedido = new Pedido();
  total: number;
  cantidad: number;

  constructor(public car: CarritoService) { }

  ngOnInit() {
    this.recuperarCarrito();
    
  }

 

  async recuperarCarrito(){
    await this.car.recuperarPedido().then(ped =>{
      const aux = ped;
      this.pedido = aux;

      this.getTotal();
      this.getCantidad();

    });
  }

  async sumCarrito(p : Product){
    console.log("se enviara el producto ", p);
    await this.car.guardarProductoCarrito(p);
    location.reload ();

  }
  async resCarrito(p : Product){
    await this.car.removerProducto(p);
    location.reload ();
  }


  getTotal(){
    this.total = 0;
    this.pedido.productos.forEach(produc => {
     this.total = ( produc.producto.costo)* produc.cantidad + this.total;
    });

  }
  getCantidad(){
    this.cantidad = 0;
    this.pedido.productos.forEach(produc => {
      this.cantidad = produc.cantidad + this.cantidad;
     });

  }


  realizarPedido(){
    
  }


}
