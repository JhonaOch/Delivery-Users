import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { MapaService } from '../../services/mapa.service';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Mapa } from '../../model/mapa';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  mapa: Mapa = new Mapa();

  p: any[];


  title = 'AGM (Angular google maps)';
  lat = -2.897458;
  lng = -79.004488;
  add="";

  currentLocation: any = {
    latitude: null,
    longitude: null,
    street: "",
    active: true
  };

  centerLocation: any = {
    latitude: null,
    longitude: null,
    address: "",
  };

 

  

  icons = {
    client: "https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-48.png",
    shop: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png",
    center: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Inside-Chartreuse.png",
    pointer: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Ball-Azure.png"
  };


  uidPedido:string;

  constructor(private locationService: LocationService,private ns: NotificacionesService, private mapaService: MapaService, public rout:ActivatedRoute, public router: Router) { 

    this.rout.queryParams.subscribe(result=>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.uidPedido=this.router.getCurrentNavigation().extras.queryParams.idPdido;
        console.log(this.uidPedido);
      }
    })


  }

  async ngOnInit() {
    this.currentLocation = await this.locationService.getCurrentLocation(true);
    if (this.currentLocation == null || this.currentLocation == undefined){
      this.ns.notificacionToast('No se pudo determinar su ubucación automáticamente.');
      this.currentLocation ={
        latitude: -2.897458,
        longitude: -79.004488,
        street: "Centro histórico de Cuenca",
        active: true
      }
    }
  }

  newAddress(event: any) {
    if (event) {
      this.centerLocation.latitude = event.lat;
      this.centerLocation.longitude = event.lng;
      this.locationService.getAddressOfLocation(this.centerLocation);
      
      
    } 
  }

  guardar(){
    // console.log("mapa", this.mapa);
    this.mapa.uidPedido=this.uidPedido;
    this.mapa.latitude=this.centerLocation.latitude;
    this.mapa.longitude=this.centerLocation.longitude;
    this.mapa.address=this.centerLocation.address;
    console.log("-------------------------",this.mapa.address)
    this.mapaService.addMapa(this.mapa);
    this.router.navigate(["/carrito"]);


  }

  getPuntos(){
    this.mapaService.getAddress().subscribe(
      resp => {
        // console.log("Respuesta de Firebase ", resp);
        // this.locationService.getAddressOfLocation(resp);
        
        this.p = resp;
        // for(let i=0; i < resp.length; i++){
        //   this.puntos.latitude = resp[i].latitude;
        //   this.puntos.longitude = resp[i].latitude;
        //   this.puntos.address = resp[i].address;
        //   console.log("object", this.puntos);
        //   this.locationService.getAddressOfLocation(this.puntos);
        // }


      }
    );
  }
  setNewLocation(event){
    if(event){
      this.centerLocation.latitude = event.lat;
      this.centerLocation.longitude = event.lng;
      this.centerLocation.address = event.add;
      this.locationService.getAddressOfLocation(this.centerLocation);
    }
  }
}
