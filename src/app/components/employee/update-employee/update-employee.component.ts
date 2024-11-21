import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Employee } from '../../../model/employee.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  employee: Employee = {
    cedula: undefined,
    nombre: '',
    username: '',
    password: '',
    rol: 'EMPLOYEE'
  };
  successMessage: string = '';
  errorMessage: string = '';
  employeeId: number | undefined;
  isSubmitting: boolean = false; // Control para evitar múltiples solicitudes

  constructor(private servicioCda: ServicioCdaService) {}

  buscarEmpleado(): void {
    if (this.employeeId === 1) {
      this.errorMessage = 'No es posible acceder al empleado con cédula (Administrador).';
      this.employee = { cedula: undefined, nombre: '', username: '', password: '', rol: '' };
      return;
    }

    if (this.employeeId !== undefined) {
      this.isSubmitting = true; // Evitar solicitudes múltiples
      this.servicioCda.getEmployeeById(this.employeeId).subscribe(
        (response) => {
          this.employee = response;
          this.errorMessage = '';
          this.isSubmitting = false;
        },
        (error) => {
          this.errorMessage = 'No se encontró un empleado con esa cédula.';
          this.employee = { cedula: undefined, nombre: '', username: '', password: '', rol: '' };
          this.isSubmitting = false;
        }
      );
    } else {
      this.errorMessage = 'Debe ingresar la cédula del empleado.';
    }
  }

  actualizarEmpleado(form: NgForm): void {
    if (this.employee.cedula === 1) {
      this.errorMessage = 'No es posible actualizar al Administrador con cédula 1.';
      return;
    }

    if (!this.employee.cedula) {
      this.errorMessage = 'ID del empleado no válido.';
      return;
    }

    this.isSubmitting = true; // Evitar solicitudes múltiples

    this.servicioCda.updateEmployee(this.employee.cedula, this.employee).subscribe(
      (response) => {
        this.successMessage = 'Empleado actualizado exitosamente.';
        this.errorMessage = '';
        form.resetForm(); // Resetear el formulario después de actualizar
        this.isSubmitting = false;
        setTimeout(() => (this.successMessage = ''), 4000); // Mensaje de éxito durante 5 segundos
      },
      (error) => {
        this.errorMessage = 'Error al actualizar el empleado.';
        console.error('Error al actualizar empleado:', error);
        this.isSubmitting = false;
      }
    );
  }
}
