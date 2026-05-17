import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CrewMember, RestaurantData, ScheduleItem } from '../commons/restaurant.interface';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  readonly crew = signal<readonly CrewMember[]>([]);
  readonly schedule = signal<readonly ScheduleItem[]>([]);
  readonly isLoading = signal<boolean>(true);

  constructor() {
    // Las llamadas HTTP con URLs relativas solo funcionan en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<RestaurantData>('assets/data/restaurant.json').subscribe({
        next: (data) => {
          this.crew.set(data.crew);
          this.schedule.set(data.schedule);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error cargando datos del restaurante:', err);
          this.isLoading.set(false);
        }
      });
    } else {
      // En SSR: no carga datos, el cliente lo hará al hidratar
      this.isLoading.set(false);
    }
  }

  getCrew(): readonly CrewMember[] {
    return this.crew();
  }

  getSchedule(): readonly ScheduleItem[] {
    return this.schedule();
  }
}
