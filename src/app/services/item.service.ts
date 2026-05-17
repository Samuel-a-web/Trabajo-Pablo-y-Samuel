import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Item } from '../commons/item';

interface MenuJsonResponse {
  categorias: { id: string; titulo: string; icono: string; items: Item[] }[];
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly http = inject(HttpClient);
  private readonly JSON_URL = '/assets/menu.json';

  getItems(): Observable<Item[]> {
    return this.http
      .get<MenuJsonResponse>(this.JSON_URL)
      .pipe(
        map(data => data.categorias.flatMap(cat => cat.items))
      );
  }

  getItemPorId(id: string): Observable<Item | undefined> {
    return this.getItems().pipe(
      map(items => items.find(i => i.id === id))
    );
  }
}
