import { ProductoPedido } from './productoPedido';
export class Pedido {
    uid: string;
    uidUsario: string;
    precioTotal?: number;
    estado:string= "En Solicitud";
    productos?: ProductoPedido[];

}

