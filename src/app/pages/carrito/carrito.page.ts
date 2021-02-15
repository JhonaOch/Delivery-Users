import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Pedido } from '../../model/pedido';
import { Product } from '../../model/producto';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  pedido : Pedido = new Pedido();
  total: number;
  cantidad: number;

  constructor(public car: CarritoService, public router: Router) { }

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


  

  mapa(){
    console.log("uid del pedidooooooooooooooo",this.pedido.uid)
    let navigateExtras: NavigationExtras={
      queryParams:{idPdido:this.pedido.uid}
    };

    this.router.navigate(["/mapa"],navigateExtras);

  }


  realizarPedido(){
    this.pedido.precioTotal=this.total;
    this.car.crearPedidoBase(this.pedido);
    this.router.navigate(["/home"]);

  }


}
