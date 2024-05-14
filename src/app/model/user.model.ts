import { VehicleModel } from "./vehicle.model";

export class UserModel{
  cedula: number = 0;
  nombre: string = ' ';
  correo: string = " "
  vehiculos: VehicleModel[] = [];
}
