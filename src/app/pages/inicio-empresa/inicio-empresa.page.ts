import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-empresa',
  templateUrl: './inicio-empresa.page.html',
  styleUrls: ['./inicio-empresa.page.scss'],
})
export class InicioEmpresaPage implements OnInit {

  empresas:any[];
  opciones={
    slidesPerView:2,
    freeMode:true,
    pagination:false
  }
  constructor(public empresaService:EmpresaService, public router: Router) { }

  ngOnInit() {
    this.recuperarEmPresa();
  }


  async recuperarEmPresa(){
    await this.empresaService.getEmpresa().subscribe((respuesta:any)=>{
      this.empresas = respuesta;
      console.log( this.empresas);

    })
   
  }


  redirigir(uid:string){
    console.log(uid)
    let navigateExtras: NavigationExtras={
      queryParams:{idEmp:uid}
    };
    this.router.navigate(['/categoria-emp'],navigateExtras)
  }

}
