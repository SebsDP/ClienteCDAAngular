// src/app/components/user/update-user/update-user.component.ts
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
    if (this.cedula !== undefined) {
      this.servicioCda.getUsuarioById(this.cedula).subscribe(
        (response) => {
          this.usuario = response;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Usuario no encontrado';
          this.usuario = { cedula: undefined, nombre: '', correo: '', vehiculos: [] };
        }
      );
    } else {
      this.errorMessage = 'Debe ingresar una cédula válida.';
    }
  }

  actualizarUsuario(form: NgForm): void {
    if (this.usuario.cedula !== undefined) {
      this.servicioCda.updateUsuario(this.usuario.cedula, this.usuario).subscribe(
        (response) => {
          this.successMessage = 'Usuario actualizado exitosamente';
          this.errorMessage = '';
          form.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        (error) => {
          this.errorMessage = 'Error al actualizar el usuario.';
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      this.errorMessage = 'Cédula del usuario no válida.';
    }
  }
}