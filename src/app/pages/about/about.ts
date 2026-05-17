import { Component, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about.html',
})
export class AboutPageComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly restaurantService = inject(RestaurantService);

  constructor() {
    afterNextRender(() => {
      // Espera a que los datos del JSON carguen antes de inicializar los tooltips
      setTimeout(() => this.initTooltips(), 800);
    });
  }

  private initTooltips(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const bs = (window as any).bootstrap;
    if (!bs) return;
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      new bs.Tooltip(el);
    });
  }
}

