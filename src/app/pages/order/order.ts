import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order.html',
})
export class OrderPageComponent {
  private readonly platformId = inject(PLATFORM_ID);
  public cartService = inject(CartService);
  pedidoConfirmado = false;

  formData = {
    nombre: '',
    telefono: '',
    direccion: '',
    notas: ''
  };

  confirmarPedido() {
    if (
      this.formData.nombre &&
      this.formData.telefono &&
      this.formData.direccion &&
      this.cartService.totalUnidades() > 0
    ) {
      this.pedidoConfirmado = true;
      this.cartService.vaciarCarrito();
      
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}
