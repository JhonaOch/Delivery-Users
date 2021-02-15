import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  uidCategoria:string;

  constructor(public afs: AngularFirestore) {

   }


  getProductosCat():Observable<any>{
    
    this.uidCategoria="f5lSyL94fqRLq1iLNvHO";​​
    console.log("llego el id de la categoria0"+ this.uidCategoria)
    const refPro= this.afs.collection("categoriaProductos");
   return  refPro.doc(this.uidCategoria).collection("productos",ref => ref.where("uidCategoria","==",this.uidCategoria)).valueChanges();

  }

  
  
}
