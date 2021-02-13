import { ProductoPedido } from './productoPedido';
export class Pedido {
    uid: string;
    precioTotal?: number;
    estado: string;
    productos?: ProductoPedido[];

}

