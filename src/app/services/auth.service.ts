import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User, LoginCredentials, RegisterCredentials } from '../commons/restaurant.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  // Estado del usuario actual
  readonly currentUser = signal<User | null>(null);

  private readonly USERS_KEY = 'krusty_users';
  private readonly SESSION_KEY = 'krusty_current_user';

  constructor() {
    this.loadSession();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadSession() {
    if (this.isBrowser()) {
      const session = localStorage.getItem(this.SESSION_KEY);
      if (session) {
        this.currentUser.set(JSON.parse(session));
      }
    }
  }

  private getUsers(): User[] {
    if (!this.isBrowser()) return [];
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]) {
    if (this.isBrowser()) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
  }

  register(credentials: RegisterCredentials): { success: boolean; error?: string } {
    const users = this.getUsers();
    if (users.some(u => u.username.toLowerCase() === credentials.username.toLowerCase())) {
      return { success: false, error: 'El nombre de usuario ya está en uso' };
    }
    const newUser: User = {
      id: Date.now().toString(),
      username: credentials.username,
      password: credentials.password
    };
    users.push(newUser);
    this.saveUsers(users);
    this.setSession(newUser);
    return { success: true };
  }

  login(credentials: LoginCredentials): { success: boolean; error?: string } {
    const users = this.getUsers();
    const user = users.find(u =>
      u.username.toLowerCase() === credentials.username.toLowerCase() &&
      u.password === credentials.password
    );
    if (user) {
      this.setSession(user);
      return { success: true };
    }
    return { success: false, error: 'Usuario o contraseña incorrectos' };
  }

  logout() {
    this.currentUser.set(null);
    if (this.isBrowser()) {
      localStorage.removeItem(this.SESSION_KEY);
    }
  }

  private setSession(user: User) {
    this.currentUser.set(user);
    if (this.isBrowser()) {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    }
  }
}
