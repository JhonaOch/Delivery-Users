import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Product } from 'src/app/model/producto';
import { CategoriaService } from 'src/app/services/categoria.service';



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
  buscarNombre:string;
  busqueda: string;
  

  constructor(public empresaService:EmpresaService, public router: Router, private rout:ActivatedRoute,public categoriaS:CategoriaService) {
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

  // async buscaNombre(name:string){
    
  //   this.categoriaS.buscarCategoriaPorNombre(name).subscribe((resp)=>{
  //     name=resp;
  //     console.log(name);
      
  //   })

  //   this.recuperarCategorias();

  // }


  buscar(){
    console.log(this.busqueda)

      if(this.busqueda == null || this.busqueda == ""){
        this.recuperarCategorias();
      }else{
        
        this.categoriaS.buscarCategoriaPorNombre(this.busqueda).subscribe(resp =>{
          this.categorias=resp;
          console.log("jojojojo",this.categorias);
        });
       
      }
  }


}

