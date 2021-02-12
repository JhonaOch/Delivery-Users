import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth"
import { User } from '../model/user';
import { Router, UrlSerializer} from "@angular/router"
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth, private router:Router, public afs: AngularFirestore) { }

  logout(){
    
      this.AFauth.signOut().then(()=>{
        this.router.navigate(["/login"])
      });
      
    
  }
  login(correo:string, contrasena:string){

      return new Promise((resolve, reject)=>{
        this.AFauth.signInWithEmailAndPassword(correo,contrasena).then(user =>{
          resolve(user)
          //this.updateUserData(user);
        }).catch(err => reject(err));
      })
      
  }
  async sendVerificationEmail(): Promise<void> {}
  async loginGoogle(): Promise<any>{
    try{
      const {user} = await this.AFauth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      //this.updateUserData(user);
      return user;
    }catch(error){console.log("error login google",error)}
  }

  async Register(correo:string, contrasena:string){
    return this.AFauth.createUserWithEmailAndPassword(correo,contrasena);

  }

  registrarUsuario(user:User){
    let refUser= this.afs.collection("Users");
    user.rol="cliente";

    console.log(user.uid, user.direccion, user.nombre, user.apellido,user.correo,user.telefono, user.rol );
    refUser.doc(user.uid).set(Object.assign({},user),{merge:true});
  
  }

  registrarUsuarioGoogle(user:User){
    let refUser= this.afs.collection("Users");
    user.rol="cliente";

    console.log(user.uid, user.direccion, user.nombre, user.apellido,user.correo,user.telefono, user.rol );
    refUser.doc(user.uid).set(Object.assign({},user),{merge:true});
  
  }


  async resetContra(email:string): Promise<void> {
    try{
      return this.AFauth.sendPasswordResetEmail(email);
    }catch(error){console.log("error rest pass",error)}
  }

  private updateUserData(user:any){
    const userRef:AngularFirestoreDocument<User>= this.afs.doc(`Users/${user.uid}`)
    const data:User={
      uid:user.uid,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      direccion: user.direccion,
      telefono: user.direccion,
      rol: user.rol,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    }

    return userRef.set(data,{merge:true})
  }
}
