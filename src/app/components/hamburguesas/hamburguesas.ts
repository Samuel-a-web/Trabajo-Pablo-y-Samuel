import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-hamburguesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburguesas.html',
})
export class HamburguesasComponent {
  private readonly menuService = inject(MenuService);
  public readonly cartService = inject(CartService);

  readonly hamburguesas = computed(() => {
    const categories = this.menuService.categories();
    const burgerCategory = categories.find(c => c.id === 'cangreburgers');
    return burgerCategory ? burgerCategory.items : [];
  });
  
  readonly cargando = this.menuService.isLoading;
  readonly error = computed(() => '');
}
