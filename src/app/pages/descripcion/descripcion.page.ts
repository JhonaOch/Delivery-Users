import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Product } from '../../model/producto';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {

producto : Product = new Product();
 
  uidProducto : string;
  uidCategoria : string;
  constructor(public router: Router, private rout:ActivatedRoute, private emprService: EmpresaService) { 
    this.recuperarParametro();
  }

  ngOnInit() {
  }


  async recuperarParametro(){
    await this.rout.queryParams.subscribe(result=>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.uidProducto=this.router.getCurrentNavigation().extras.queryParams.idP;
        this.uidCategoria=this.router.getCurrentNavigation().extras.queryParams.idC;
        console.log("Esta el producto-------",this.uidProducto);
        console.log("Esta el Categoria-------",this.uidCategoria);
      }
    })

    this.recuperarProducto()

  }


 async recuperarProducto(){
    await this.emprService.buscarProducto(this.uidCategoria,this.uidProducto).then(resp =>{
      const aux:any = resp
      this.producto = aux;
      console.log(this.producto.nombre);
    })
    
  }


  agregarCarrito(){
    this.router.navigate(["/productos"])

  }




}
