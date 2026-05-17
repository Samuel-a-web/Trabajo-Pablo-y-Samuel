import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../commons/menu.interface';

@Component({
  selector: 'app-hamburguesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburguesas.html',
})
export class HamburguesasComponent implements OnInit {
  private readonly menuService = inject(MenuService);
  public readonly cartService = inject(CartService);

  readonly hamburguesas = signal<MenuItem[]>([]);
  readonly cargando = signal<boolean>(true);
  readonly error = signal<string>('');

  ngOnInit(): void {
    this.menuService.getHamburguesas().subscribe({
      next: (items) => {
        this.hamburguesas.set(items);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al cargar las hamburguesas. Inténtalo de nuevo.');
        this.cargando.set(false);
      }
    });
  }
}
