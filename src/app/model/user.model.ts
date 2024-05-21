// src/app/model/user.model.ts
export interface Usuario {
  cedula?: number;  // Propiedad opcional
  nombre: string;
  correo: string;
  vehiculos: any[];  // Puedes ajustar el tipo de los vehículos según sea necesario
}
