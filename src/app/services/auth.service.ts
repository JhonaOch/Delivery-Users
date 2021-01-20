import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth"
import { User } from '../model/user';
import { Router} from "@angular/router"




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth, private router:Router) { }

  logout(){
    
      this.AFauth.signOut().then(()=>{
        this.router.navigate(["/login"])
      });
      
    
  }
  login(correo:string, contrasena:string){

      return new Promise((resolve, reject)=>{
        this.AFauth.signInWithEmailAndPassword(correo,contrasena).then(user =>{
          resolve(user)
        }).catch(err => reject(err));
      })
      
  }
  async sendVerificationEmail(): Promise<void> {}
  async loginGoogle(): Promise<void> {}
  async Register(): Promise<void> {}
  async resetContra(): Promise<void> {}
}
