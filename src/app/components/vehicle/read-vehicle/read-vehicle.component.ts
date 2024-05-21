import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Vehiculo } from '../../../model/vehicle.model';

@Component({
  selector: 'app-read-vehicle',
  templateUrl: './read-vehicle.component.html',
  styleUrls: ['./read-vehicle.component.css']
})
export class ReadVehicleComponent {
  usuarioId: number | undefined;
  vehiculos: Vehiculo[] = [];
  errorMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  buscarVehiculos(): void {
    if (this.usuarioId !== undefined) {
      this.servicioCda.getVehiculosByUsuarioCedula(this.usuarioId).subscribe(
        response => {
          this.vehiculos = response;
          this.errorMessage = '';
        },
        error => {
          this.vehiculos = [];
          this.errorMessage = 'No se encontraron vehículos para este usuario.';
        }
      );
    }
  }
}
