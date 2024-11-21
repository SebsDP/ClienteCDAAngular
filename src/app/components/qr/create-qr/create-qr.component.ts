import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { QR } from '../../../model/qr.model';

@Component({
  selector: 'app-create-qr',
  templateUrl: './create-qr.component.html',
  styleUrls: ['./create-qr.component.css'],
})
export class CreateQrComponent {
  qr: QR = {
    quejasRecomendaciones: '',
    fechaCreacion: new Date(),
  };
  successMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;

  constructor(private servicioCda: ServicioCdaService) {}

  // Crear QR
  createQR(form: NgForm): void {
    this.servicioCda.createQR(this.qr).subscribe({
      next: (response) => {
        this.successMessage = 'QR creado exitosamente.';
        this.errorMessage = '';
        form.resetForm();
        this.qr.fechaCreacion = new Date(); // Restablecer la fecha
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: () => {
        this.errorMessage = 'Error al crear el QR. Intente nuevamente.';
        this.successMessage = '';
        setTimeout(() => (this.errorMessage = ''), 3000);
      },
    });
  }
}
