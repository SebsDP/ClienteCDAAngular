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
  vehiculoSeleccionado: Vehiculo | null = null;
  placaSeleccionada: string = '';
  usuarioEncontrado: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private servicioCda: ServicioCdaService) {}

  buscarUsuario(): void {
    if (this.usuarioId !== undefined) {
      this.isSubmitting = true;
      this.servicioCda.getUsuarioById(this.usuarioId).subscribe(
        response => {
          this.usuarioEncontrado = true;
          this.errorMessage = '';
          this.buscarVehiculos();
          this.isSubmitting = false;
        },
        error => {
          this.usuarioEncontrado = false;
          this.errorMessage = 'No se encontró un usuario con esa cédula.';
          this.vehiculos = [];
          this.isSubmitting = false;
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

  cargarDetallesVehiculo(): void {
    if (this.placaSeleccionada) {
      const vehiculo = this.vehiculos.find(v => v.placa === this.placaSeleccionada);
      if (vehiculo) {
        this.vehiculoSeleccionado = vehiculo;
      } else {
        this.vehiculoSeleccionado = null;
        this.errorMessage = 'No se encontró el vehículo seleccionado.';
      }
    } else {
      this.vehiculoSeleccionado = null;
    }
  }

  eliminarVehiculo(vehiculo: Vehiculo): void {
    if (this.usuarioId !== undefined) {
      const confirmacion = confirm('¿Está seguro de que desea eliminar este vehículo?');
      if (confirmacion) {
        this.isSubmitting = true;
        this.servicioCda.deleteVehiculo(this.usuarioId, vehiculo.placa).subscribe(() => {
            this.successMessage = 'El vehículo ha sido eliminado correctamente';
            this.buscarVehiculos(); // Actualizar la lista de vehículos después de la eliminación
            this.vehiculoSeleccionado = null; // Limpiar la selección
            this.isSubmitting = false;
            setTimeout(() => this.successMessage = '', 4000);
          },
          error => {
            this.errorMessage = 'Error al eliminar el vehículo';
            this.isSubmitting = false;
          });
      }
    }
  }
}
