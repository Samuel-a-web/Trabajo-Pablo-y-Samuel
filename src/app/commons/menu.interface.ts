export interface MenuItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
}

export interface MenuCategoria {
  id: string;
  titulo: string;
  icono: string;
  items: MenuItem[];
}
