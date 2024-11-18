// src/app/components/employee/update-employee/update-employee.component.ts
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
  employee: Employee = { cedula: undefined, nombre: '', username: '', password: '', rol: 'EMPLOYEE' };
  successMessage: string = '';
  errorMessage: string = '';
  employeeId: number | undefined;

  constructor(private servicioCda: ServicioCdaService) {}

  buscarEmpleado(): void {
    if (this.employeeId !== undefined) {
      this.servicioCda.getEmployeeById(this.employeeId).subscribe(
        (response) => {
          this.employee = response;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Empleado no encontrado';
          this.employee = { cedula: undefined, nombre: '', username: '', password: '', rol: '' };
        }
      );
    } else {
      this.errorMessage = 'Debe ingresar un ID válido.';
    }
  }

  actualizarEmpleado(form: NgForm): void {
    if (this.employee.cedula!== undefined) {
      this.servicioCda.updateEmployee(this.employee.cedula, this.employee).subscribe(
        (response) => {
          this.successMessage = 'Empleado actualizado exitosamente';
          this.errorMessage = '';
          form.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        (error) => {
          this.errorMessage = 'Error al actualizar el empleado.';
          console.error('Error al actualizar empleado:', error);
        }
      );
    } else {
      this.errorMessage = 'ID del empleado no válido.';
    }
  }
}
