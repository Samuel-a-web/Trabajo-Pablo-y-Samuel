import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);


  constructor() {
    this.cargarSesion();
  }

  private esBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private cargarSesion() {
    if (this.esBrowser()) {
      const sesion = localStorage.getItem(this.CLAVE_SESION);
      if (sesion) {
        this.usuarioActual.set(JSON.parse(sesion));
      }
    }
  }

  private getUsuarios(): Usuario[] {
    if (!this.esBrowser()) return [];
    const usuarios = localStorage.getItem(this.CLAVE_USUARIOS);
    return usuarios ? JSON.parse(usuarios) : [];
  }

  private guardarUsuarios(usuarios: Usuario[]) {
    if (this.esBrowser()) {
      localStorage.setItem(this.CLAVE_USUARIOS, JSON.stringify(usuarios));
    }
  }

  }

  logout() {
    this.usuarioActual.set(null);
    if (this.esBrowser()) {
      localStorage.removeItem(this.CLAVE_SESION);
    }
  }

  private establecerSesion(usuario: Usuario) {
    this.usuarioActual.set(usuario);
    if (this.esBrowser()) {
      localStorage.setItem(this.CLAVE_SESION, JSON.stringify(usuario));
    }
  }
}
