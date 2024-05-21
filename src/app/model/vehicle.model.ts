export interface Vehiculo {
  placa: string;
  fecha: Date;
  resultadoTecno?: boolean;
  soat: boolean;
  tipoVehiculo: string;
  cilindraje?: number; // Opcional para motocicletas
  numAirbag?: number; // Opcional para vehículos ligeros
}

export interface Motocicleta extends Vehiculo {
  cilindraje: number;
}

export interface Ligero extends Vehiculo {
  numAirbag: number;
}
