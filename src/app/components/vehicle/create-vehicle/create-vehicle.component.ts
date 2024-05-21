import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Vehiculo } from '../../../model/vehicle.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent {
  usuarioId: number | undefined;
  usuarioEncontrado: boolean = false;
  vehiculo: Vehiculo = {
    placa: '',
    fecha: new Date(),
    resultadoTecno: false,
    soat: false,
    tipoVehiculo: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  buscarUsuario(): void {
    if (this.usuarioId !== undefined) {
      this.servicioCda.getUsuarioById(this.usuarioId).subscribe(
        response => {
          this.usuarioEncontrado = true;
          this.errorMessage = '';
        },
        error => {
          this.usuarioEncontrado = false;
          this.errorMessage = 'No se encontró un usuario con esa cédula.';
        }
      );
    }
  }

  crearVehiculo(form: NgForm): void {
    if (this.usuarioId !== undefined) {
      this.servicioCda.createVehiculo(this.usuarioId, this.vehiculo).subscribe(
        response => {
          this.successMessage = 'Vehículo registrado exitosamente';
          this.alertMessage = this.vehiculo.resultadoTecno ? 'Su resultado técnico-mecánico ha sido aprobado' : 'Su resultado técnico-mecánico ha sido reprobado';
          this.showAlert = true;
          this.errorMessage = '';  // Limpiar el mensaje de error si se registra correctamente
          form.resetForm();
          setTimeout(() => {
            this.successMessage = '';
            this.showAlert = false;
          }, 3000);
        },
        error => {
          if (error.error.message && error.error.message.includes('SOAT')) {
            this.errorMessage = 'El vehículo no se puede registrar porque el SOAT no es válido';
          } else {
            this.errorMessage = error.error.message || 'El vehículo no se puede registrar porque el SOAT no es válido';
          }
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    }
  }

  closeModal(): void {
    this.showAlert = false;
  }
}
