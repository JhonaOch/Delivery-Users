import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Product } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productos: any[] = [];


  constructor(private storage: Storage) { 
     this.recuperarCariito();
  }

  guardarProductoCarrito(prod:any){
    console.log("llego seeeeeeeeeeeeeeeeeeeeeeeee",prod)
    const existe = this.productos.find(pr => pr.uid === prod.uid);
    

    if(!existe){
      
    this.productos.unshift(prod);
    this.storage.set('carrito',this.productos);

    }

  }

  async recuperarCariito(){
    const aux = await this.storage.get('carrito') || []
    this.productos = aux;
    console.log("slg    ------------------------ "+ this.productos);
    return this.productos;
  

  }



}
