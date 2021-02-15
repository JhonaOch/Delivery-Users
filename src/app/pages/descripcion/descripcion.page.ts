import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Product } from '../../model/producto';
import { CarritoService } from '../../services/carrito.service';
import { CarritoPage } from '../carrito/carrito.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {

producto : Product = new Product();
 
  uidProducto : string;
  uidCategoria : string;
  verificarPro: boolean;

  constructor(public router: Router, private rout:ActivatedRoute, private emprService: EmpresaService, private carrito: CarritoService, public toastController: ToastController) { 
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Para seleccionar este producto debe vaciar su carrito de compras',
      duration: 2000
    });
    toast.present();
  }


  async agregarCarrito(){

    await this.carrito.verificarCruce(this.producto).then(pro =>{
      this.verificarPro = pro;
      if(this.verificarPro == false){
        this.presentToast();
      }else if(this.verificarPro == true){
        this.router.navigate(["/productos"]);
      }
   
    })
    
    
  }







}
