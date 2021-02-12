import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(public afs: AngularFirestore) { }

  getCategoriaEmpresa():Observable<any>{
    return this.afs.collection("categoriaEmpresa").valueChanges();
  }

  getEmpresaid(uidCatEmpresa:string):Observable<any>{
    return this.afs.collection("empresas",ref => ref.where("categoriaEmpresaid","==",uidCatEmpresa)).valueChanges();
  }

  findEmpresaPorID(uidEmpresa : string){
    return this.afs.collection("empresas",ref => ref.where("uid","==",uidEmpresa)).valueChanges();
  }

  getCategoriasProductos(uidEmpresa:string):Observable<any>{
    console.log("llega al service",uidEmpresa)
    return this.afs.collection("categoriaProductos",ref => ref.where("uidEmpresa","==",uidEmpresa)).valueChanges();
  }

 
  getProductosCat( uidCategoria : string):Observable<any>{
  console.log("llego el id de la categoria0"+ uidCategoria)
  const refPro= this.afs.collection("categoriaProductos");
  return  refPro.doc(uidCategoria).collection("productos",ref => ref.where("uidCategoria","==",uidCategoria)).valueChanges();
  }
  

  async buscarProducto(uidCat: string, uidPro: string){
    try{
      let aux = await this.afs.collection("categoriaProductos").doc(uidCat).collection("productos",ref => ref.where("uid","==",uidPro)).valueChanges()
                .pipe(first()).toPromise().then(doc => {
                  return doc;
                }).catch(error => {
                  throw error;
              });
        if(aux==null)
          return {};
        return aux[0];
    }catch(error){
    console.error("Error get contactos ById", error);
    throw error;
    } 
  }
  
}
