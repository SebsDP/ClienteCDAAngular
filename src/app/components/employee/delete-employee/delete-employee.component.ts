import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Employee } from '../../../model/employee.model';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent {
  employeeId: number | undefined; // ID del empleado a buscar
  employee: Employee | null = null; // Detalles del empleado encontrado
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error
  isSubmitting: boolean = false; // Bandera para evitar múltiples solicitudes

  constructor(private servicioCda: ServicioCdaService) {}

  // Buscar empleado por cédula
  buscarEmpleado(): void {

    if (this.employeeId === 1) {
      this.errorMessage = 'No es posible acceder al empleado con cédula (Administrador).';
      this.employee = null;
      return;
    }
    if (!this.employeeId) {
      this.errorMessage = 'Debe ingresar la cédula del empleado.';
      this.employee = null;
      return;
    }

    this.isSubmitting = true;

    this.servicioCda.getEmployeeById(this.employeeId).subscribe(
      (response) => {
        this.employee = response;
        this.errorMessage = '';
        this.isSubmitting = false;
      },
      (error) => {
        this.employee = null;
        this.errorMessage = 'No se encontró un empleado con esa cédula.';
        this.isSubmitting = false;
      }
    );
  }

  // Eliminar empleado
  eliminarEmpleado(): void {
    if (this.employee && this.employee.cedula !== undefined) {
      const confirmacion = confirm('¿Está seguro de que desea eliminar este empleado?');
      if (!confirmacion) return;

      this.isSubmitting = true;

      this.servicioCda.deleteEmployee(this.employee.cedula).subscribe(
        () => {
          this.successMessage = 'Empleado eliminado exitosamente.';
          this.errorMessage = '';
          this.resetForm();
          this.isSubmitting = false;
          setTimeout(() => (this.successMessage = ''), 4000); // Limpia el mensaje después de 5 segundos
        },
        (error) => {
          this.errorMessage = 'Error al eliminar el empleado.';
          console.error('Error al eliminar empleado:', error);
          this.isSubmitting = false;
        }
      );
    }
  }

  // Resetear formulario y estado
  resetForm(): void {
    this.employee = null;
    this.employeeId = undefined;
    this.errorMessage = '';
  }
}
