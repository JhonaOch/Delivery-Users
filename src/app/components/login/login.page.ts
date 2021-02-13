import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router'
import { User } from '../../model/user';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string;
  contra:string;
  usuario: User=new User();

  constructor(private auth: AuthService, public router: Router, public car: CarritoService) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    
    this.auth.login(this.correo,this.contra).then(res => {
      this.router.navigate(['/home'])
    }).catch(err => alert("No existe el usuario"));
    this.crearP();

    
  }

  async crearP(){
   await this.car.crearPedidoIni();
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

    }catch(error){console.log("error login google",error)}
  }

}
