import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { MenuPageComponent } from './pages/menu/menu';
import { AboutPageComponent } from './pages/about/about';
import { OrderPageComponent } from './pages/order/order';
import { NotFoundPageComponent } from './pages/not-found/not-found';
import { HamburguesasComponent } from './components/hamburguesas/hamburguesas';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomePageComponent, title: 'El Crustáceo Crujiente - Inicio' },
  { path: 'menu', component: MenuPageComponent, title: 'El Crustáceo Crujiente - Carta' },
  { path: 'hamburguesas', component: HamburguesasComponent, title: 'El Crustáceo Crujiente - Cangreburgers' },
  { path: 'about', component: AboutPageComponent, title: 'El Crustáceo Crujiente - Nosotros' },
  { path: 'order', component: OrderPageComponent, title: 'El Crustáceo Crujiente - Pedir Ahora' },
  { path: '**', component: NotFoundPageComponent, title: 'Página no encontrada' }
];
