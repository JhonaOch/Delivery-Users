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


}





