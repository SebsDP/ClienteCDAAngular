import { Component } from '@angular/core';
import { ServicioCdaService } from "../../../service/servicio-cda.service";
import { Usuario } from "../../../model/user.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  usuario: Usuario = { cedula: undefined, nombre: '', correo: '', vehiculos: [] };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  crearUsuario(form: NgForm): void {
    if (!this.usuario.cedula || !this.usuario.correo || !this.usuario.nombre) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      setTimeout(() => this.errorMessage = '', 5000);
      return;
    }

    this.servicioCda.createUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        this.successMessage = 'Usuario registrado exitosamente';
        this.errorMessage = '';
        form.resetForm();
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Ya existe un usuario con esa cédula o correo.';
        } else {
          this.errorMessage = 'Ya existe un usuario con esa cédula o correo.';
        }
        console.error('Error al crear usuario:', error);
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }
}
