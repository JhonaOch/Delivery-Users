import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-categoria-emp',
  templateUrl: './categoria-emp.page.html',
  styleUrls: ['./categoria-emp.page.scss'],
})
export class CategoriaEmpPage implements OnInit {

  uidR:string;
  empresa:any[];
  categorias:any[];
  photo:string;

  constructor(public empresaService:EmpresaService, public router: Router, private rout:ActivatedRoute) {
    this.rout.queryParams.subscribe(result=>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.uidR=this.router.getCurrentNavigation().extras.queryParams.idEmp;
        console.log(this.uidR);
      }
    })
   }

  ngOnInit() {
    this.recuperarEmpresa();
  }

  async recuperarEmpresa(){;
    this.empresaService.findEmpresaPorID(this.uidR).subscribe((resp)=>{
      this.empresa=resp;
      this.photo=this.empresa[0].img
      
    })
    this.recuperarCategorias();
  }

  async recuperarCategorias(){
    this.empresaService.getCategoriasProductos(this.uidR).subscribe((resp)=>{
      this.categorias=resp;
      console.log(this.categorias);
      
    })
  }

  redirigir(uidCat : string){

    let navigateExtras: NavigationExtras={
       queryParams:{idC:uidCat}
    };

    this.router.navigate(['/productos'],navigateExtras)
  }
}