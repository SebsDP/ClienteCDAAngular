import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Employee } from '../../../model/employee.model';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  employee: Employee = {
    cedula: undefined,
    nombre: '',
    username: '',
    password: '',
    rol: 'EMPLOYEE',
  };

  successMessage: string = '';
  errorMessage: string = ''; // Variable para el mensaje de error

  constructor(private servicioCda: ServicioCdaService, private router: Router) {}

  crearEmpleado(form: NgForm): void {
    this.servicioCda.createEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Empleado creado:', response);
        this.successMessage = 'Empleado registrado exitosamente';
        this.errorMessage = '';
        form.resetForm();
        setTimeout(() => this.successMessage = '', 5000); // Borra el mensaje después de 3 segundos
      },
      error: (error) => {
        // Manejo del error en caso de conflicto
        if (error.status === 409) { // Código de error 409 para conflictos (CEDULA o USERNAME ya existente)
          this.errorMessage = 'Ya existe un empleado con esa cédula o nombre de usuario.';
        } else {
          this.errorMessage = 'Ocurrió un error al registrar el empleado. Por favor, inténtalo nuevamente.';
        }
        console.error('Error al crear empleado:', error);
      }
    });
  }
}
