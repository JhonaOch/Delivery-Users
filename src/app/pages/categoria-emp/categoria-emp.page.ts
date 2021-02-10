import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-categoria-emp',
  templateUrl: './categoria-emp.page.html',
  styleUrls: ['./categoria-emp.page.scss'],
})
export class CategoriaEmpPage implements OnInit {

  uidR:string;
  empresa:any[];
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
    await this.empresaService.findEmpresaPorID(this.uidR).subscribe((resp: any)=>{
      this.empresa=resp;
      this.photo=this.empresa[0].img
      console.log();
    })
  }
}
