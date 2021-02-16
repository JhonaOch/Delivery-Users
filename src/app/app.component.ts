import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {

      title: 'Carrito',
      url: '/carrito',
      icon: 'cart'
    },
    {
      title: 'Misión y Visión',
      url: '/vision',
      icon: 'heart'
    },
    {
      title: 'Contacto',
      url: '/contactos',
      icon: 'create'
    },
    {
      title: 'Configuración',
      url: '/modifusuario',
      icon: 'construct'
    }
  ];
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public aunt: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  codigoUsuario: string;
  usuario: User = new User();
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

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


}
