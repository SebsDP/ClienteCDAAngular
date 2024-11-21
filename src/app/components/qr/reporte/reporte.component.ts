import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent {
  // Variables for year and month selection
  ano: number | null = null;
  mes: number | null = null;

  // Variables for UI feedback
  successMessage: string = '';
  errorMessage: string = '';
  step: 'initial' | 'year' | 'month' = 'initial'; // To manage steps

  constructor(private servicioCda: ServicioCdaService) {}

  // Navigate to year selection
  selectYear(): void {
    this.step = 'year';
  }

  // Navigate to month selection
  selectMonth(): void {
    if (this.ano) {
      this.step = 'month';
    } else {
      this.errorMessage = 'Seleccione primero el año.';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }

  // Generate report by year
  generateReportByYear(): void {
    if (this.ano) {
      this.servicioCda.generateQRReportByYear(this.ano).subscribe({
        next: (response) => {
          const fileName = `reporte_qr_${this.ano}.pdf`;
          saveAs(response, fileName);
          this.successMessage = `Reporte del año ${this.ano} generado exitosamente.`;
          setTimeout(() => (this.successMessage = ''), 3000);
          this.step = 'initial'; // Reset to initial step
        },
        error: () => {
          this.errorMessage = `Error al generar el reporte del año ${this.ano}.`;
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
    }
  }

  // Generate report by month
  generateReportByMonth(): void {
    if (this.ano && this.mes) {
      this.servicioCda.generateQRReportByMonth(this.ano, this.mes).subscribe({
        next: (response) => {
          const fileName = `reporte_qr_${this.ano}_${this.mes}.pdf`;
          saveAs(response, fileName);
          this.successMessage = `Reporte del mes ${this.mes} del año ${this.ano} generado exitosamente.`;
          setTimeout(() => (this.successMessage = ''), 3000);
          this.step = 'initial'; // Reset to initial step
        },
        error: () => {
          this.errorMessage = `Error al generar el reporte del mes ${this.mes} del año ${this.ano}.`;
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
    }
  }
}
