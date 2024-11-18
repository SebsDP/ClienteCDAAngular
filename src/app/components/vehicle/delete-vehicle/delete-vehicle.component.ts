import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Vehiculo } from '../../../model/vehicle.model';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css']
})
export class DeleteVehicleComponent {
  usuarioId: number | undefined;
  vehiculos: Vehiculo[] = [];
  usuarioEncontrado: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  buscarUsuario(): void {
    if (this.usuarioId !== undefined) {
      this.servicioCda.getUsuarioById(this.usuarioId).subscribe(
        response => {
          this.usuarioEncontrado = true;
          this.errorMessage = '';
          this.buscarVehiculos();
        },
        error => {
          this.usuarioEncontrado = false;
          this.errorMessage = 'No se encontró un usuario con esa cédula.';
        }
      );
    }
  }

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

  eliminarVehiculo(vehiculo: Vehiculo): void {
    if (this.usuarioId !== undefined) {
      const confirmacion = confirm('¿Está seguro de que desea eliminar este vehículo?');
      if (confirmacion) {
        this.servicioCda.deleteVehiculo(this.usuarioId, vehiculo.placa).subscribe(() => {
            this.successMessage = 'El vehículo ha sido eliminado correctamente';
            this.buscarVehiculos(); // Actualizar la lista de vehículos después de la eliminación
            setTimeout(() => this.successMessage = '', 3000);
          },
          error => {
            this.errorMessage = 'Error al eliminar el vehículo';
          });
      }
    }
  }
}