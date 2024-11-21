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
  isSubmitting: boolean = false; // Bandera para evitar múltiples envíos

  constructor(private servicioCda: ServicioCdaService, private router: Router) {}

  crearEmpleado(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Por favor, llene todos los campos.';
      setTimeout(() => this.errorMessage = '', 4000);
      return;
    }

    if (this.isSubmitting) {
      return; // Evitar múltiples envíos
    }

    this.isSubmitting = true; // Bloquear el botón de envío

    this.servicioCda.createEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Empleado creado:', response);
        this.successMessage = 'Empleado registrado exitosamente.';
        this.errorMessage = '';
        form.resetForm();
        this.isSubmitting = false;
        setTimeout(() => this.successMessage = '', 4000); // Borra el mensaje después de 5 segundos
      },
      error: (error) => {
        // Manejo del error en caso de conflicto
        if (error.status === 409) { // Código de error 409 para conflictos (CEDULA o USERNAME ya existente)
          this.errorMessage = 'Ya existe un empleado con esa cédula o nombre de usuario.';
        } else {
          this.errorMessage = 'Ya existe un empleado con esa cédula o nombre de usuario.';
        }
        console.error('Error al crear empleado:', error);
        this.isSubmitting = false; // Habilitar el botón de envío nuevamente
      }
    });
  }
}
