import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  
}
