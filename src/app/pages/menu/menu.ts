import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItemCardComponent } from '../../components/menu-item-card/menu-item-card';

@Component({
  selector: 'app-menu-page',
  imports: [MenuItemCardComponent],
  templateUrl: './menu.html',
})
export class MenuPageComponent {
  readonly menuService = inject(MenuService);
  readonly cartService = inject(CartService);
}
