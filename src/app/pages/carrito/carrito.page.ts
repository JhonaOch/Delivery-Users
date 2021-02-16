import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Pedido } from '../../model/pedido';
import { Product } from '../../model/producto';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  pedido : Pedido = new Pedido();
  total: number;
  cantidad: number;
  codigoUsuario: string;

  constructor(public car: CarritoService, public router: Router, public aunt: AuthService) { }

  ngOnInit() {
    this.recuperarCarrito();
    this.recuperarUsu();
    
  }


  async recuperarUsu(){
    await this.aunt.getUsuarioStorage().then((respuesta : string) => {
      this.codigoUsuario = respuesta;
      console.log("llego al home --------------------------------------"+ this.codigoUsuario);
    }).catch(error => {console.log(error)})

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


 async realizarPedido(){
    this.pedido.precioTotal=this.total;
    for(let uidEmp of this.pedido.productos){
        this.pedido.uidEmpresa=uidEmp.producto.uidEmpresa;
      continue;
    }
    await this.car.crearPedidoBase(this.pedido);
   
    this.crearPedidoInicial();

  }


  async crearPedidoInicial(){
    
    await this.car.crearPedidoIni(this.codigoUsuario);
    console.log("creao un nuevo carro",this.codigoUsuario )
    this.router.navigate(["/home"]);

  }


 async vaciarCarrito(){
    await this.car.vaciarCarrito();
    this.router.navigate(["/home"]);
    console.log("ELIMINA TODOS LOS DATOS");
  }


}
