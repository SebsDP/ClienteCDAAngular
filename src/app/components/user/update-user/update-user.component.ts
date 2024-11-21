import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Usuario } from '../../../model/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  usuario: Usuario = { cedula: undefined, nombre: '', correo: '', vehiculos: [] };
  successMessage: string = '';
  errorMessage: string = '';
  cedula: number | undefined;

  constructor(private servicioCda: ServicioCdaService) {}

  buscarUsuario(): void {
    // Validar que la cédula sea un número válido
    if (!this.cedula || this.cedula <= 0) {
      this.errorMessage = 'Debe ingresar la cédula del cliente.';
      this.successMessage = '';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }

    // Llamada al servicio para buscar el usuario por cédula
    this.servicioCda.getUsuarioById(this.cedula).subscribe({
      next: (response) => {
        this.usuario = response;
        this.errorMessage = '';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (error) => {
        this.errorMessage = 'No se encontró ningún cliente con esa cédula.';
        this.successMessage = '';
        this.usuario = { cedula: undefined, nombre: '', correo: '', vehiculos: [] };
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    });
  }

  actualizarUsuario(form: NgForm): void {
    // Validar que la cédula exista en el usuario
    if (!this.usuario.cedula) {
      this.errorMessage = 'No se puede actualizar sin una cédula válida.';
      this.successMessage = '';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }

    // Validar que todos los campos obligatorios estén completos
    if (!this.usuario.nombre || !this.usuario.correo) {
      this.errorMessage = 'Debe completar todos los campos obligatorios antes de actualizar.';
      this.successMessage = '';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }

    // Validar formato del correo solo si fue modificado o enviado
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoRegex.test(this.usuario.correo)) {
      this.errorMessage = 'Debe ingresar un correo electrónico válido.';
      this.successMessage = '';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }

    // Llamada al servicio para actualizar el usuario
    this.servicioCda.updateUsuario(this.usuario.cedula, this.usuario).subscribe({
      next: (response) => {
        this.successMessage = 'Usuario actualizado exitosamente.';
        this.errorMessage = '';
        form.resetForm();
        this.usuario = { cedula: undefined, nombre: '', correo: '', vehiculos: [] };
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage = 'Datos inválidos. Por favor, revise la información ingresada.';
        } else if (error.status === 404) {
          this.errorMessage = 'El usuario ya no existe en el sistema.';
        } else {
          this.errorMessage = 'Error al actualizar el usuario. Intente nuevamente más tarde.';
        }
        this.successMessage = '';
        console.error('Error al actualizar usuario:', error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    });
  }
}
