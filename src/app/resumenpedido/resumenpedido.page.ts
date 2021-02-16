import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { CategoriaService } from '../services/categoria.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-resumenpedido',
  templateUrl: './resumenpedido.page.html',
  styleUrls: ['./resumenpedido.page.scss'],
})
export class ResumenpedidoPage implements OnInit {
  codigoUsuario: string;
  usuario: User = new User();
  productos: any[];
  aux : any[];

  constructor(public aunt: AuthService, public cat: CategoriaService, public router: Router) { }

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

    this.recuperarPedidos();
    
  }


 async recuperarPedidos(){
   
    await this.cat.getPedidos(this.codigoUsuario).subscribe((resp:any)  =>{
      this.aux = resp;
      this.productos=resp.productos;
      console.log("Este el el productoooooooooooooooooooooooooooooooooooooooo",this.productos);
      
    })

  }


  redirigir(uidPedido:String){
    console.log(uidPedido,"Llego al redirigir Del modificar")
    let navigateExtras:NavigationExtras={
      queryParams:{uidPedido:uidPedido}

    };
    this.router.navigate(["/pedidodet"],navigateExtras)


  }


}
