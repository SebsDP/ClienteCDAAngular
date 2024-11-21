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
  emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos

  constructor(private servicioCda: ServicioCdaService) {}

  crearUsuario(form: NgForm): void {
    if (!this.usuario.cedula || !this.usuario.nombre || !this.usuario.correo) {
      this.errorMessage = 'Por favor, llene todos los campos.';
      setTimeout(() => this.errorMessage = '', 4000);
      return;
    }

    // Validar el formato del correo
    if (!this.emailRegex.test(this.usuario.correo)) {
      this.errorMessage = 'Por favor, ingrese un correo válido.';
      setTimeout(() => this.errorMessage = '', 4000);
      return;
    }

    this.servicioCda.createUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        this.successMessage = 'Usuario registrado exitosamente';
        this.errorMessage = '';
        form.resetForm();
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Ya existe un usuario con esa cédula o correo.';
        } else {
          this.errorMessage = 'Ocurrió un error al registrar el usuario.';
        }
        console.error('Error al crear usuario:', error);
        setTimeout(() => this.errorMessage = '', 4000);
      }
    });
  }
}
