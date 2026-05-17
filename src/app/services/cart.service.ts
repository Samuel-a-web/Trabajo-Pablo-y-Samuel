import { Injectable, computed, signal } from '@angular/core';
import { MenuItem } from '../commons/menu.interface';
import { CartItem } from '../commons/cart.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly cartItems = signal<CartItem[]>([]);

  readonly totalItemsCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  readonly cartTotalNumber = computed(() =>
    this.cartItems().reduce((total, item) => {
      return total + (this.parsePrice(item.price) * item.quantity);
    }, 0)
  );

  readonly cartTotalFormatted = computed(() =>
    this.cartTotalNumber().toFixed(2).replace('.', ',') + ' €'
  );

  addToCart(item: MenuItem): void {
    this.cartItems.update(items => {
      const existing = items.find(i => i.id === item.id);
      if (existing) {
        return items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...item, quantity: 1 }];
    });
  }

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

  private parsePrice(price: string): number {
    if (!price) return 0;
    const cleanStr = price.replace('€', '').replace(',', '.').trim();
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : num;
  }
}
