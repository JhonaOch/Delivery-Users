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
    if(mapa.id==null){
      mapa.id = this.afs.createId();
    }   
    refMapa.doc(mapa.id).set(Object.assign({}, mapa))
  }

  getAddress(){
   const dato = this.afs.collection('mapa').valueChanges();
  //  console.log("servicio del mapa ", dato);

   return dato;
  }

}
