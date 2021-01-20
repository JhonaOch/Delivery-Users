import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string;
  contra:string;

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.auth.login(this.correo,this.contra).then(res => {
      this.router.navigate(['/home'])
    }).catch(err => alert("No existe el usuario"));
    
  }

}
