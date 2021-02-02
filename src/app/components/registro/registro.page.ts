import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../model/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user: User=new User();

  rol: "cliente";
  contrasena:string;

  constructor(private auth: AuthService,public router: Router,public storage: AngularFireStorage) { }
  ngOnInit() {
  }

  async onSubmitRegistro(){ 
    await this.auth.Register(this.user.correo, this.contrasena).then(res=>{
      this.user.uid=res.user.uid;
      this.user.rol= this.rol;
      this.auth.registrarUsuario(this.user);
      this.router.navigate(['/home'])

    }).catch(err => alert("No existe el usuario"+err));
    


  }

}
