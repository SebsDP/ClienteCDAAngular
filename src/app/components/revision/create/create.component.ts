import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { AuthService } from '../../../service/auth.service';
import { Revision } from '../../../model/revision.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-revision-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class RevisionCreateComponent {
  vehiculoPlaca: string = ''; // Placa del vehículo
  vehiculoEncontrado: boolean = false; // Bandera para validar si se encontró el vehículo
  revision: Revision = {
    fechaRevision: new Date(),
    resultadoRevision: false,
    vehiculoPlaca: '',
  };
  successMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;

  constructor(private servicioCda: ServicioCdaService, private authService: AuthService) {}

  // Buscar vehículo por placa
  buscarVehiculo(): void {
    if (this.vehiculoPlaca) {
      this.servicioCda.getVehiculoByPlaca(this.vehiculoPlaca).subscribe({
        next: () => {
          this.vehiculoEncontrado = true; // Marcar que se encontró el vehículo
          this.revision.vehiculoPlaca = this.vehiculoPlaca; // Asignar la placa al modelo de revisión
          this.errorMessage = '';
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.vehiculoEncontrado = false; // Marcar que no se encontró el vehículo
          this.errorMessage = `No se encontró un vehículo con la placa ${this.vehiculoPlaca}.`;
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      });
    } else {
      this.errorMessage = 'Debe ingresar la placa del vehículo antes de buscar.';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }

  // Crear revisión
  crearRevision(form: NgForm): void {
    const username = this.authService.getUsername(); // Obtener el username desde el AuthService
    if (!username) {
      this.errorMessage = 'No se pudo determinar el usuario actual. Por favor, inicie sesión.';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }
  
    if (this.vehiculoPlaca && this.vehiculoEncontrado) {
      this.revision.vehiculoPlaca = this.vehiculoPlaca; // Asignar la placa al modelo de revisión
      this.servicioCda.createRevision(this.vehiculoPlaca, this.revision, username).subscribe({
        next: () => {
          this.successMessage = 'Revisión registrada exitosamente.';
          this.errorMessage = '';
          this.vehiculoEncontrado = false; // Reiniciar bandera después de crear
          form.resetForm(); // Limpiar el formulario
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Error al registrar la revisión. Intente nuevamente.';
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      });
    } else {
      this.errorMessage = 'Debe buscar un vehículo antes de registrar la revisión.';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }  
}
