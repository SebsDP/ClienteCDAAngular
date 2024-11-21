import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Vehiculo } from '../../../model/vehicle.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent {
  usuarioId: number | undefined;
  placas: string[] = []; // Lista de placas del usuario
  placaSeleccionada: string = ''; // Placa seleccionada en el dropdown
  vehiculo: Vehiculo | null = null;
  usuarioEncontrado: boolean = false;
  successMessage: string = '';
  errorUsuarioMessage: string = ''; // Mensaje de error para usuario
  errorVehiculoMessage: string = ''; // Mensaje de error para vehículo
  showAlert: boolean = false;
  alertMessage: string = '';
  isSubmitting: boolean = false; // Bandera para evitar múltiples envíos

  constructor(private servicioCda: ServicioCdaService) {}

  buscarUsuario(): void {
    if (this.usuarioId !== undefined) {
      this.servicioCda.getUsuarioById(this.usuarioId).subscribe(
        response => {
          this.usuarioEncontrado = true;
          this.errorUsuarioMessage = ''; // Limpiar el error de usuario si se encuentra
  
          // Obtener las placas asociadas al usuario
          this.servicioCda.getVehiculosByUsuarioCedula(this.usuarioId!).subscribe(
            vehiculos => {
              this.placas = vehiculos.map(v => v.placa); // Extraer únicamente las placas
            },
            error => {
              this.placas = [];
              this.errorVehiculoMessage = 'No se encontraron vehículos para este usuario.';
            }
          );
        },
        error => {
          this.usuarioEncontrado = false;
          this.errorUsuarioMessage = 'No se encontró un usuario con esa cédula.';
        }
      );
    } else {
      this.errorUsuarioMessage = 'Debe ingresar una cédula válida.';
    }
  }
  

  cargarVehiculo(): void {
    if (this.usuarioId !== undefined && this.placaSeleccionada !== '') {
      this.servicioCda.getVehiculoByPlacaYUsuario(this.usuarioId, this.placaSeleccionada).subscribe(
        response => {
          this.vehiculo = response;
          this.errorVehiculoMessage = ''; // Limpiar el error de vehículo si se encuentra
        },
        error => {
          this.vehiculo = null;
          this.errorVehiculoMessage = 'No se encontró un vehículo con esa placa para este usuario.';
        }
      );
    }
  }

  actualizarVehiculo(form: NgForm): void {
    if (this.isSubmitting) {
      return; // Evitar múltiples envíos
    }

    if (this.usuarioId !== undefined && this.placaSeleccionada !== '' && this.vehiculo) {
      this.isSubmitting = true; // Bloquear el botón de envío

      this.servicioCda.updateVehiculo(this.usuarioId, this.placaSeleccionada, this.vehiculo).subscribe(
        response => {
          console.log('Vehículo actualizado:', response);
          this.successMessage = 'Vehículo actualizado exitosamente.';
          this.errorVehiculoMessage = '';
          this.showAlert = true;

          form.resetForm(); // Limpiar el formulario
          this.vehiculo = null; // Cerrar el formulario del vehículo
          this.usuarioEncontrado = false; // Ocultar detalles del usuario
          this.placas = []; // Limpiar la lista de placas

          setTimeout(() => {
            this.successMessage = '';
            this.showAlert = false;
            this.isSubmitting = false; // Habilitar el botón de envío nuevamente
          }, 4000);
        },
        error => {
          this.errorVehiculoMessage = 'Hubo un error al actualizar el vehículo. Intente nuevamente.';
          this.isSubmitting = false; // Habilitar el botón de envío nuevamente
        }
      );
    } else {
      this.errorVehiculoMessage = 'Debe completar todos los campos antes de actualizar.';
    }
  }

  closeModal(): void {
    this.showAlert = false;
  }
}
