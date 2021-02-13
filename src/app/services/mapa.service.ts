import { Injectable } from '@angular/core';
import { Mapa } from '../model/mapa';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(public afs: AngularFirestore) { }

  addMapa(mapa: Mapa){
    // console.log(mapa);
    const refMapa = this.afs.collection("mapa");
    refMapa.doc(mapa.uidPedido).set(Object.assign({}, mapa))
  }

  getAddress(){
   const dato = this.afs.collection('mapa').valueChanges();
  //  console.log("servicio del mapa ", dato);

   return dato;
  }

}
