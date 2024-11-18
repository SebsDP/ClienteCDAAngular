import { Component } from '@angular/core';
import { ServicioCdaService } from '../../service/servicio-cda.service';
import { CertificadoTecnicoMecanica } from '../../model/certificado-tecnico-mecanica.model';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificateDownloadComponent {
  certificadoId: number | undefined;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  descargarCertificado(): void {
    if (this.certificadoId !== undefined) {
      this.servicioCda.downloadCertificate(this.certificadoId).subscribe(
        response => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Certificado_${this.certificadoId}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);

          // Mensaje de éxito
          this.successMessage = 'Certificado descargado exitosamente';
          this.clearMessagesAfterDelay();
        },
        error => {
          // Mensaje de error
          this.errorMessage = 'Error al descargar el certificado';
          this.clearMessagesAfterDelay();
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingrese un ID de certificado válido';
      this.clearMessagesAfterDelay();
    }
  }

  // Función para limpiar mensajes después de unos segundos
  private clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
