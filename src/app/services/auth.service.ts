import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario, CredencialesLogin, CredencialesRegistro } from '../commons/restaurant.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  // Estado
  readonly usuarioActual = signal<Usuario | null>(null);

  private readonly CLAVE_USUARIOS = 'krusty_usuarios';
  private readonly CLAVE_SESION = 'krusty_sesion_actual';

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

  registrar(credenciales: CredencialesRegistro): { exito: boolean; error?: string } {
    const usuarios = this.getUsuarios();

    if (usuarios.some(u => u.nombreUsuario.toLowerCase() === credenciales.nombreUsuario.toLowerCase())) {
      return { exito: false, error: 'El nombre de usuario ya está en uso' };
    }

    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombreUsuario: credenciales.nombreUsuario,
      contrasena: credenciales.contrasena
    };

    usuarios.push(nuevoUsuario);
    this.guardarUsuarios(usuarios);
    this.establecerSesion(nuevoUsuario);
    return { exito: true };
  }

  login(credenciales: CredencialesLogin): { exito: boolean; error?: string } {
    const usuarios = this.getUsuarios();
    const usuario = usuarios.find(u =>
      u.nombreUsuario.toLowerCase() === credenciales.nombreUsuario.toLowerCase() &&
      u.contrasena === credenciales.contrasena
    );

    if (usuario) {
      this.establecerSesion(usuario);
      return { exito: true };
    }

    return { exito: false, error: 'Usuario o contraseña incorrectos' };
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
