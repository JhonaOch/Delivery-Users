import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-pedidodet',
  templateUrl: './pedidodet.page.html',
  styleUrls: ['./pedidodet.page.scss'],
})
export class PedidodetPage implements OnInit {

  uidPed:string;
  pedidos:any[];
  mapa:any[];

  constructor(public router:Router,private rout:ActivatedRoute, public cat: CategoriaService) { 

    this.rout.queryParams.subscribe(result=>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.uidPed=this.router.getCurrentNavigation().extras.queryParams.uidPedido;
        console.log("este es el id del pedido",this.uidPed);
      }
    })


  }

  ngOnInit() {
    this.listarPedidos();
  }

  async listarPedidos(){
    await this.cat.getPedidosbyId(this.uidPed).subscribe(res=>{
      this.pedidos=res;
      console.log("holaaaaaaaaaaaaaaaaaaaaaaa",this.pedidos)
    })

  }

}
