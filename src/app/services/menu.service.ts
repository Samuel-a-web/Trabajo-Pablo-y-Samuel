import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MenuCategory, MenuData } from '../commons/menu.interface';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  readonly categories = signal<readonly MenuCategory[]>([]);
  readonly isLoading = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<MenuData>('assets/data/menu.json').subscribe({
        next: (data) => {
          this.categories.set(data.categories);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error cargando el menú:', err);
          this.isLoading.set(false);
        }
      });
    } else {
      this.isLoading.set(false);
    }
  }

  getCategories(): readonly MenuCategory[] {
    return this.categories();
  }
}
