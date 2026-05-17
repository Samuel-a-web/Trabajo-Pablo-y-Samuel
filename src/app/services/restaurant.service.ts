import { Injectable } from '@angular/core';
import { MiembroEquipo, HorarioItem } from '../commons/restaurant.models';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private readonly equipo: readonly MiembroEquipo[] = [
    {
      id: 'bob',
      nombre: 'Bob Esponja',
      emoji: '🧽',
      descripcion: 'Cocinero estrella del Crustáceo Crujiente. Siempre prepara cada Cangreburger con energía y una gran sonrisa.',
      rol: 'Cocinero Principal',
      curiosidad: '¡Puede preparar hasta 1.000 Cangreburgers por hora! Vive en una piña debajo del mar junto a su mascota Gary.',
    },
    {
      id: 'calamardo',
      nombre: 'Calamardo',
      emoji: '🐙',
      descripcion: 'Encargado de caja y atención al cliente. Mantiene el orden del local, aunque no siempre con el mejor humor.',
      rol: 'Cajero y Atención al Cliente',
      curiosidad: 'Artista y músico en sus ratos libres. Toca el clarinete (aunque sus vecinos no lo aprecien demasiado).',
    },
    {
      id: 'cangrejo',
      nombre: 'El Señor Cangrejo',
      emoji: '🦀',
      descripcion: 'Propietario del restaurante y guardián de la receta secreta. Lidera el negocio con visión y mucha ambición.',
      rol: 'Propietario y Gerente',
      curiosidad: 'La fórmula secreta de la Cangreburger está guardada en una caja fuerte. ¡Nadie la conoce excepto él!',
    },
  ];

  private readonly horario: readonly HorarioItem[] = [
    { dia: 'Lunes - Jueves', horas: '13:00 - 16:00 / 20:00 - 23:00', tooltip: 'Horario entre semana estándar' },
    { dia: 'Viernes', horas: '13:00 - 16:30 / 20:00 - 23:30', tooltip: '¡Viernes con horario extendido!' },
    { dia: 'Sábado', horas: '13:00 - 16:30 / 20:00 - 00:00', tooltip: 'Abierto hasta medianoche los sábados' },
    { dia: 'Domingo', horas: '13:00 - 16:00', tooltip: 'Solo turno de mediodía los domingos' },
  ];

  getEquipo(): readonly MiembroEquipo[] {
    return this.equipo;
  }

  getHorario(): readonly HorarioItem[] {
    return this.horario;
  }
}
