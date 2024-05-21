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
  placa: string = '';
  vehiculo: Vehiculo | null = null;
  usuarioEncontrado: boolean = false;
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

  buscarVehiculo(): void {
    if (this.usuarioId !== undefined && this.placa !== '') {
      this.servicioCda.getVehiculoByPlacaYUsuario(this.usuarioId, this.placa).subscribe(
        response => {
          this.vehiculo = response;
          this.errorMessage = '';
        },
        error => {
          this.vehiculo = null;
          this.errorMessage = 'No se encontró un vehículo con esa placa para este usuario.';
        }
      );
    }
  }

  actualizarVehiculo(form: NgForm): void {
    if (this.usuarioId !== undefined && this.placa !== '' && this.vehiculo) {
      this.servicioCda.updateVehiculo(this.usuarioId, this.placa, this.vehiculo).subscribe(response => {
        console.log('Vehículo actualizado:', response);
        this.successMessage = 'Vehículo actualizado exitosamente';
        if (this.vehiculo) {
          this.alertMessage = this.vehiculo.resultadoTecno ? 'Su resultado técnico-mecánico ha sido aprobado' : 'Su resultado técnico-mecánico ha sido reprobado';
        }
        this.showAlert = true;
        form.resetForm();
        setTimeout(() => this.successMessage = '', 3000);
        setTimeout(() => this.showAlert = false, 3000);
      });
    }
  }

  closeModal(): void {
    this.showAlert = false;
  }
}
