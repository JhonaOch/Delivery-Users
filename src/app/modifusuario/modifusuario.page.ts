import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-modifusuario',
  templateUrl: './modifusuario.page.html',
  styleUrls: ['./modifusuario.page.scss'],
})
export class ModifusuarioPage implements OnInit {
  codigoUsuario: string;
  usuario: User = new User();

  constructor(public aunt: AuthService) { }

  ngOnInit() {
    this.recuperarUsu();
   
  }

  async recuperarUsu(){
    await this.aunt.getUsuarioStorage().then((respuesta : string) => {
      this.codigoUsuario = respuesta;
      console.log("llego al modificar usuario--------------------------------------"+ this.codigoUsuario);
    }).catch(error => {console.log(error)})

    this.BuscraUsu();

  }

  async BuscraUsu(){
  
    await this.aunt.findUidUsuario(this.codigoUsuario).then((resp:any)=>{
      const aux = resp;
      this.usuario = aux;
      console.log(this.usuario);

    })
    
  }

  modificarUsuario(){
    this.aunt.registrarUsuario(this.usuario);    
  }

}
