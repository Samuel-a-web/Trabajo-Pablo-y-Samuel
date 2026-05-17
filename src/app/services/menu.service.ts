import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MenuCategoria, MenuItem } from '../commons/menu.interface';

interface MenuJsonResponse {
  categorias: MenuCategoria[];
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly JSON_URL = '/assets/menu.json';

  getCategorias(): Observable<MenuCategoria[]> {
    return this.http
      .get<MenuJsonResponse>(this.JSON_URL)
      .pipe(map(data => data.categorias));
  }

  getCategoriaPorId(id: string): Observable<MenuCategoria | undefined> {
    return this.getCategorias().pipe(
      map(cats => cats.find(c => c.id === id))
    );
  }

  getHamburguesas(): Observable<MenuItem[]> {
    return this.getCategoriaPorId('cangreburgers').pipe(
      map(cat => cat ? [...cat.items] : [])
    );
  }
}
