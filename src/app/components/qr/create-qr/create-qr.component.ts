// src/app/components/qr/create-qr/create-qr.component.ts
import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { QR } from '../../../model/qr.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-qr',
  templateUrl: './create-qr.component.html',
  styleUrls: ['./create-qr.component.css']
})
export class CreateQrComponent {
  qr: QR = { quejasRecomendaciones: '' };
  successMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  crearQR(form: NgForm): void {
    this.servicioCda.createQR(this.qr).subscribe(response => {
      console.log('Queja/Recomendación creada:', response);
      this.successMessage = 'Queja/Recomendación registrada exitosamente';
      form.resetForm();
      setTimeout(() => this.successMessage = '', 3000);
    });
  }
}
