import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service'; // Ajustado para subir un nivel
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent {
  ano: number | null = null;
  mes: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  generateReportByYear(): void {
    if (this.ano) {
      this.servicioCda.generateQRReportByYear(this.ano).subscribe({
        next: (response) => {
          const fileName = `reporte_qr_${this.ano}.pdf`;
          saveAs(response, fileName);
          this.successMessage = `Reporte del año ${this.ano} generado exitosamente.`;
          this.errorMessage = '';
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = `Error al generar el reporte del año ${this.ano}.`;
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
    } else {
      this.errorMessage = 'Debe ingresar un año válido.';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }

  generateReportByMonth(): void {
    if (this.ano && this.mes) {
      this.servicioCda.generateQRReportByMonth(this.ano, this.mes).subscribe({
        next: (response) => {
          const fileName = `reporte_qr_${this.ano}_${this.mes}.pdf`;
          saveAs(response, fileName);
          this.successMessage = `Reporte del año ${this.ano} y mes ${this.mes} generado exitosamente.`;
          this.errorMessage = '';
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = `Error al generar el reporte del año ${this.ano} y mes ${this.mes}.`;
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
    } else {
      this.errorMessage = 'Debe ingresar un año y un mes válidos.';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }
}
