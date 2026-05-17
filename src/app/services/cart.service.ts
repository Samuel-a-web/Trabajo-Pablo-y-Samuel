import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
      }
      return [...items, { ...item, cantidad: 1 }];
    });
  }

      return items.filter(i => i.id !== itemId);
    });
  }

  vaciarCarrito(): void {
    this.itemsCarrito.set([]);
  }

    return isNaN(num) ? 0 : num;
  }
}
