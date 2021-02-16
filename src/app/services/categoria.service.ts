import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(public afs: AngularFirestore) { }


  buscarCategoriaPorNombre(nombre: string): Observable < any > {
    return this.afs.collection("categoriaProductos", ref => ref.where("nombre", "==", nombre)).valueChanges();
  
  }  


  getPedidos(empresaId : string): Observable<any>{
    console.log(  "Entra pedido")
    return this.afs.collection('pedidos',ref => ref.where('uidUsario', '==',empresaId)).valueChanges();
  }

  getPedidosbyId(uidPed : string): Observable<any>{
    console.log(  "Entra pedido Para listar",uidPed)
    return this.afs.collection('pedidos',ref => ref.where('uid', '==',uidPed)).valueChanges();
  }




}





