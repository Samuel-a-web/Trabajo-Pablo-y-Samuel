import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { MenuItemCardComponent } from '../../components/menu-item-card/menu-item-card';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, MenuItemCardComponent],
  templateUrl: './menu.html',
})
export class MenuPageComponent {
  public menuService = inject(MenuService);
}
