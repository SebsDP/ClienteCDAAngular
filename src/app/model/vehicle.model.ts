export interface Usuario {
  cedula: number;
  nombre?: string;
  correo?: string;
}

export interface Vehiculo {
  placa: string;
  fecha: Date;
  resultadoTecno?: boolean;
  soat:boolean | string;
  tipoVehiculo: string;
  usuario?: Usuario; // Agregamos esta propiedad opcional
  cilindraje?: number; // Opcional para motocicletas
  numAirbag?: number; // Opcional para vehículos ligeros
  img_url?: string;
}

export interface Motocicleta extends Vehiculo {
  cilindraje: number;
}

export interface Ligero extends Vehiculo {
  numAirbag: number;
}
