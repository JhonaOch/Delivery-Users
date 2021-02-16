import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router'
import { User } from '../../model/user';
import { CarritoService } from '../../services/carrito.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 toastController: ToastController

  correo:string;
  contra:string;
  usuario: User=new User();
  usuario1: string;
  showPassword=false;
  passwordToggleIcon='eye';

  constructor(private auth: AuthService, public router: Router, public car: CarritoService) { }

  ngOnInit() {
  }

  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  onSubmitLogin(){
    
    this.auth.login(this.correo,this.contra).then((res:any) => {
      this.usuario1 = res.user.uid;
      console.log("soy el usuario",this.usuario1);
      this.crearP();
      this.router.navigate(['/home'])
      
    }).catch(

      err=>
      {
    
        this.presentToast("Usuario Incorrecto")
        
        
      }
   
    
    );

  }
  

  async crearP(){
    console.log("va a crear")
   await this.car.crearPedidoIni(this.usuario1);
   await this.auth.guardarStorage(this.usuario1);
  }

  async loginGoogle(){
    try{
      const user = await this.auth.loginGoogle();
      if(user){
        console.log("user----------->",user)
        this.usuario.uid=user.uid;
        this.usuario.correo=user.email;
        var splitted = user.displayName.split(" ", 2); 
        this.usuario.nombre= splitted[0];
        this.usuario.apellido= splitted[1];
        this.usuario.telefono=user.phoneNumber;
        
        
        this.auth.registrarUsuario(this.usuario);
        this.router.navigate(['/home'])
      }

    }catch(error)
    {console.log("error login google",error)}
    
  }

  togglePassword():void{
    this.showPassword=!this.showPassword;
    if(this.passwordToggleIcon=='eye'){
      this.passwordToggleIcon='eye-off';
    }else{
      this.passwordToggleIcon='eye';
    }
  }

  

  
  

}
