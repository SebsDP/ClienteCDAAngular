import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Revision } from '../../../model/revision.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-revision-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class RevisionUpdateComponent {
  revisionId: number | null = null; // ID de la revisión
  vehiculoPlaca: string = ''; // Placa del vehículo
  revision: Revision = {
    fechaRevision: new Date(),
    resultadoRevision: false,
    vehiculoPlaca: '',
  };
  successMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;

  constructor(private servicioCda: ServicioCdaService) {}

  // Buscar una revisión por ID
  buscarRevision(): void {
    if (this.revisionId) {
      this.servicioCda.getRevisionById(this.revisionId).subscribe({
        next: (response) => {
          this.revision = response;
          this.vehiculoPlaca = this.revision.vehiculoPlaca;
          this.errorMessage = '';
          this.successMessage = `Revisión con ID ${this.revisionId} encontrada.`;
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = `No se encontró una revisión con el ID ${this.revisionId}.`;
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      });
    }
  }

  // Actualizar la revisión
  actualizarRevision(form: NgForm): void {
    const username = localStorage.getItem('username'); // Obtener el username del empleado
    if (username && this.revisionId && this.vehiculoPlaca) {
      this.revision.vehiculoPlaca = this.vehiculoPlaca; // Asignar la placa al modelo de revisión
      this.servicioCda.updateRevision(this.vehiculoPlaca, this.revision, username).subscribe({
        next: () => {
          this.successMessage = 'Revisión actualizada exitosamente.';
          this.errorMessage = '';
          form.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = 'Error al actualizar la revisión. Intente nuevamente.';
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      });
    } else {
      this.errorMessage = 'Debe buscar una revisión antes de actualizarla.';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }
}
