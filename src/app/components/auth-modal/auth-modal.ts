import { Component, PLATFORM_ID, inject, signal, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.html',
})
export class AuthModalComponent {
  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);

  private modalInstance: any = null;

  modoLogin = signal<boolean>(true);
  nombreUsuario = signal<string>('');
  contrasena = signal<string>('');
  mensajeError = signal<string>('');

  constructor() {
    afterNextRender(() => {
      this.initModal();
    });
  }

  private initModal(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById('authModal');
    if (el && typeof (window as any).bootstrap !== 'undefined') {
      this.modalInstance = (window as any).bootstrap.Modal.getOrCreateInstance(el);

      el.addEventListener('hidden.bs.modal', () => {
        this.resetForm();
      });
    }
  }

  public show(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  public hide(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  toggleModo(): void {
    this.modoLogin.update(v => !v);
    this.mensajeError.set('');
  }

  private resetForm(): void {
    this.nombreUsuario.set('');
    this.contrasena.set('');
    this.mensajeError.set('');
    this.modoLogin.set(true);
  }

  onSubmit(): void {
    if (!this.nombreUsuario().trim() || !this.contrasena().trim()) {
      this.mensajeError.set('Por favor, rellena todos los campos');
      return;
    }

    const credenciales = {
      username: this.nombreUsuario().trim(),
      password: this.contrasena()
    };

    let resultado;
    if (this.modoLogin()) {
      resultado = this.authService.login(credenciales);
    } else {
      resultado = this.authService.register(credenciales);
    }

    if (resultado.success) {
      this.hide();
      this.resetForm();
    } else {
      this.mensajeError.set(resultado.error || 'Ocurrió un error inesperado');
    }
  }
}
