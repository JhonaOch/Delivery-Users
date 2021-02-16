import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  uidCatEmpresa: string;
  productos: any[];

  constructor(public router: Router, private rout:ActivatedRoute, private emprService: EmpresaService) {


    this.recuperarParametro();

   }

  ngOnInit() {
  }

  async recuperarParametro(){
    await this.rout.queryParams.subscribe(result=>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.uidCatEmpresa=this.router.getCurrentNavigation().extras.queryParams.idC;
        console.log("Esta la categoria -------",this.uidCatEmpresa);
      }
    })

    this.recuperarProductos()

  }


 async recuperarProductos(){
    await this.emprService.getProductosCat(this.uidCatEmpresa).subscribe(resp =>{
      this.productos = resp;
      console.log(this.productos);
    })
    
  }

  redirigir(codigoP: string, codigoC : string){

    let navigateExtras: NavigationExtras={
      queryParams:{idP:codigoP, idC : codigoC}
   };
    this.router.navigate(["/descripcion"],navigateExtras)
  }

 


  home(){
    this.router.navigate(['/home']);
    

  }

}
