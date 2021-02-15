import { ProductoPedido } from './productoPedido';
export class Pedido {
    uid: string;
    uidUsario: string;
    precioTotal?: number;
    estado:string= "En Solicitud";
    uidEmpresa?:string;
    productos?: ProductoPedido[];

}

