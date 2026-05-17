export interface Item {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen?: string;
}

export interface ItemCarrito extends Item {
  cantidad: number;
}
