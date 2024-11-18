import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Employee } from '../../../model/employee.model';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent {
  employeeId: number | undefined;
  employee: Employee | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  buscarEmpleado(): void {
    if (this.employeeId !== undefined) {
      this.servicioCda.getEmployeeById(this.employeeId).subscribe(
        (response) => {
          this.employee = response;
          this.errorMessage = '';
        },
        (error) => {
          this.employee = null;
          this.errorMessage = 'No existe esa cédula del empleado.';
        }
      );
    } else {
      this.errorMessage = 'Debe ingresar una cédula válida.';
    }
  }

  eliminarEmpleado(): void {
    if (this.employee && this.employee.cedula !== undefined) {
      const confirmacion = confirm('¿Está seguro de que desea eliminar este empleado?');
      if (confirmacion) {
        this.servicioCda.deleteEmployee(this.employee.cedula).subscribe(
          () => {
            this.successMessage = 'Empleado eliminado exitosamente';
            this.errorMessage = '';
            this.resetForm();
            setTimeout(() => (this.successMessage = ''), 3000);
          },
          (error) => {
            this.errorMessage = 'Error al eliminar el empleado.';
            console.error('Error al eliminar empleado:', error);
          }
        );
      }
    }
  }

  resetForm(): void {
    this.employee = null;
    this.employeeId = undefined;
    this.errorMessage = '';
  }
}
