import { Injectable, computed, signal } from '@angular/core';
import { Item, ItemCarrito } from '../commons/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal con el estado del carrito
  readonly itemsCarrito = signal<ItemCarrito[]>([]);

  // Total de unidades en el carrito
  readonly totalUnidades = computed(() => {
    return this.itemsCarrito().reduce((total, item) => total + item.cantidad, 0);
  });

  // Total precio numérico
  readonly totalPrecioNumero = computed(() => {
    return this.itemsCarrito().reduce((total, item) => {
      return total + (this.parsearPrecio(item.precio) * item.cantidad);
    }, 0);
  });

  // Total precio formateado
  readonly totalPrecioFormateado = computed(() => {
    return this.totalPrecioNumero().toFixed(2).replace('.', ',') + ' €';
  });

  // Añadir item al carrito o incrementar cantidad
  addToCart(item: Item): void {
    this.itemsCarrito.update(items => {
      const existente = items.find(i => i.id === item.id);
      if (existente) {
        return items.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...items, { ...item, cantidad: 1 }];
    });
  }

  // Quitar item o decrementar cantidad
  removeFromCart(itemId: string, completamente: boolean = false): void {
    this.itemsCarrito.update(items => {
      if (completamente) {
        return items.filter(i => i.id !== itemId);
      }

      const existente = items.find(i => i.id === itemId);
      if (existente && existente.cantidad > 1) {
        return items.map(i => i.id === itemId ? { ...i, cantidad: i.cantidad - 1 } : i);
      }

      return items.filter(i => i.id !== itemId);
    });
  }

  vaciarCarrito(): void {
    this.itemsCarrito.set([]);
  }

  // Parsea '7,90 €' a 7.90
  private parsearPrecio(precio: string): number {
    if (!precio) return 0;
    const limpio = precio.replace('€', '').replace(',', '.').trim();
    const num = parseFloat(limpio);
    return isNaN(num) ? 0 : num;
  }
}
