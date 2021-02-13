import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Product } from '../model/producto';
import { Pedido } from '../model/pedido';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductoPedido } from '../model/productoPedido';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  
  pedido: Pedido = new Pedido();


  constructor(private storage: Storage, public afs: AngularFirestore) { 
    //  this.recuperarCariito();
  }

 async guardarProductoCarrito(prod:Product){

    const aux1 = await this.storage.get('pedido') || []
    this.pedido = aux1;

    const existe = this.pedido.productos.find(productoPedido => {
      return (productoPedido.producto.uid === prod.uid)
    });
    
    if(existe !== undefined){
      existe.cantidad ++;

    }else{
      const add: ProductoPedido = {
        cantidad: 1,
        producto: prod,
      };
      this.pedido.productos.push(add)
    }

    this.storage.set('pedido', this.pedido);

    console.log("en add pedido ->", this.pedido);

  }


 async removerProducto(prod:Product){
  const aux1 = await this.storage.get('pedido') || []
  this.pedido = aux1;
  let posicion = 0;

  const existe = this.pedido.productos.find((productoPedido,index) => {
    posicion = index;
    return (productoPedido.producto.uid === prod.uid)
  });
  
  if(existe !== undefined){
  
    existe.cantidad --;
    if(existe.cantidad === 0){
      this.pedido.productos.splice(posicion,1);
  
    }

  }


  this.storage.set('pedido', this.pedido);

  console.log("se removio ->", this.pedido);
    
  }




  crearPedidoIni(uidU: string){
    if(this.pedido.uid == null){
      // this.pedido.uid = this.afs.createId();
      this.pedido = {
        uid : this.afs.createId(),
        uidUsario: uidU,
        precioTotal : null,
        estado : " Espera",
        productos : []
      }
    }
    this.storage.set('pedido', this.pedido);
  }

 async recuperarPedido(){
    return await this.storage.get('pedido');
  }

  eliminarStoragePedido(){
    this.storage.remove("pedido");
  }


  crearPedidoBase(pedido: Pedido){
      const refContacto = this.afs.collection("pedidos");  
      refContacto.doc(pedido.uid).set(Object.assign({}, pedido), { merge: true})
    
  }




}
