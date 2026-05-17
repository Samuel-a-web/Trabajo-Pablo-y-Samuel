export interface MiembroEquipo {
  readonly id: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly emoji: string;
  readonly rol: string;
  readonly curiosidad: string;
}

export interface HorarioItem {
  readonly dia: string;
  readonly horas: string;
  readonly tooltip: string;
}

export interface Usuario {
  id: string;
  nombreUsuario: string;
  contrasena?: string;
}

export interface CredencialesLogin {
  nombreUsuario: string;
  contrasena?: string;
}

export interface CredencialesRegistro {
  nombreUsuario: string;
  contrasena?: string;
}
