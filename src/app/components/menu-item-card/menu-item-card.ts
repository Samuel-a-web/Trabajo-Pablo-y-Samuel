import { Component, input } from '@angular/core';
import { MenuItem } from '../../commons/menu.interface';
import { CartService } from '../../services/cart.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.html',
  styleUrl: './menu-item-card.css',
})
export class MenuItemCardComponent {
  readonly item = input.required<MenuItem>();
  readonly cartService = inject(CartService);
}
