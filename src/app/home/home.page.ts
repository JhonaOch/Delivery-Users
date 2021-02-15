import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmpresaService } from '../services/empresa.service';
import { Router, NavigationExtras } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Product } from '../model/producto';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  opciones={
    slidesPerView:2,
    freeMode:true,
    pagination:false
  }

  catEmpresa : any[];
  productos : any[];

  uidPro:string;


  ngOnInit() {
    this.recuperarCategoriasEm();
    this.listaProducto();

  }

  constructor(public AFauth:AuthService, public empresaService:EmpresaService, public router: Router,public productoS:ProductoService){}

  salir(){
    console.log("salir de la sesion")
    this.AFauth.logout();
    
  }


  async recuperarCategoriasEm(){
    await this.empresaService.getCategoriaEmpresa().subscribe((respuesta:any)=>{
      this.catEmpresa = respuesta;
      console.log( this.catEmpresa);

    })
   
  }

  redirigir(uid:string){
    console.log("pasa del home",uid)
    let navigateExtras: NavigationExtras={
      queryParams:{idCatEmp:uid}
    };
    this.router.navigate(['/inicio-empresa'],navigateExtras);
  }

  async listaProducto(){
    await this.productoS.getProductosCat().subscribe((respuesta:any)=>{
      this.productos = respuesta;
      console.log( this.productos);
      console.log("LLEGA AL PRODUCTOS")

    })
   
  }


  
     
  redirigir2(codigoP: string, codigoC : string){

    let navigateExtras: NavigationExtras={
      queryParams:{idP:codigoP, idC : codigoC}
   };
    this.router.navigate(["/descripcion"],navigateExtras)
  }



}


