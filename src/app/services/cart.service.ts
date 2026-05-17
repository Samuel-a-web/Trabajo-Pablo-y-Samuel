import { Injectable, computed, signal } from '@angular/core';
import { MenuItem } from '../commons/menu.interface';
import { CartItem } from '../commons/cart.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  // Signal que contiene el estado del carrito
  readonly cartItems = signal<CartItem[]>([]);

  // Número total de artículos en el carrito
  readonly totalItemsCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  // Precio total numérico
  readonly cartTotalNumber = computed(() =>
    this.cartItems().reduce((total, item) => {
      return total + (this.parsePrice(item.price) * item.quantity);
    }, 0)
  );

  // Precio total formateado como moneda
  readonly cartTotalFormatted = computed(() =>
    this.cartTotalNumber().toFixed(2).replace('.', ',') + ' €'
  );

  // Añadir artículo o incrementar cantidad si ya existe
  addToCart(item: MenuItem): void {
    this.cartItems.update(items => {
      const existing = items.find(i => i.id === item.id);
      if (existing) {
        return items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...item, quantity: 1 }];
    });
  }

  // Reducir cantidad o eliminar completamente del carrito
  removeFromCart(itemId: string, completely: boolean = false): void {
    this.cartItems.update(items => {
      if (completely) {
        return items.filter(i => i.id !== itemId);
      }
      const existing = items.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return items.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return items.filter(i => i.id !== itemId);
    });
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  // Convierte '7,90 €' en 7.90
  private parsePrice(price: string): number {
    if (!price) return 0;
    const cleanStr = price.replace('€', '').replace(',', '.').trim();
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : num;
  }
}
