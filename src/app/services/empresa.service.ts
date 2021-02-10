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

  getEmpresa():Observable<any>{
    return this.afs.collection("empresas").valueChanges();
  }

  findEmpresaPorID(uidEmpresa : string): Observable<any>{
    return this.afs.collection("empresas",ref => ref.where("uid","==",uidEmpresa)).valueChanges();
  }
}
