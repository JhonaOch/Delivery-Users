import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Product } from '../../model/producto';
import { CarritoService } from '../../services/carrito.service';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {

producto : Product = new Product();
 
  uidProducto : string;
  uidCategoria : string;
  constructor(public router: Router, private rout:ActivatedRoute, private emprService: EmpresaService, private carrito: CarritoService) { 
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

    // if(this.uidProducto==undefined && this.uidCategoria==undefined){
    //   console.log("Llego al pd")
    //   this.uidProducto=this.router.getCurrentNavigation().extras.queryParams.uidPro;
    //   console.log("uid",this.uidProducto)
    

    this.recuperarProducto()

  }


  async recuperarParametro2(){
    await this.rout.queryParams.subscribe(result=>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.uidProducto=this.router.getCurrentNavigation().extras.queryParams.uidPro;
        console.log("Esta el producto-------",this.uidProducto);
      }
    })

 

  }


 async recuperarProducto(){
    await this.emprService.buscarProducto(this.uidCategoria,this.uidProducto).then((resp:any) =>{
      const aux = resp
      this.producto = aux;
      console.log(this.producto.nombre);
    })
    
  }


  agregarCarrito(){
    console.log(this.producto, "Arrechooooooooooooooooo")
    this.carrito.guardarProductoCarrito(this.producto);
    this.router.navigate(["/carrito"]);
    
  }




}
