import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Usuario } from '../../../model/user.model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  usuarioId: number | undefined;
  usuario: Usuario | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  buscarUsuario(): void {
    if (this.usuarioId !== undefined) {
      this.servicioCda.getUsuarioById(this.usuarioId).subscribe(
        (response) => {
          this.usuario = response;
          this.errorMessage = '';
        },
        (error) => {
          this.usuario = null;
          this.errorMessage = 'No existe esa cédula del usuario.';
        }
      );
    } else {
      this.errorMessage = 'Debe ingresar la cédula del cliente.';
    }
  }

  eliminarUsuario(): void {
    if (this.usuario && this.usuario.cedula !== undefined) {
      const confirmacion = confirm('¿Está seguro de que desea eliminar este usuario?');
      if (confirmacion) {
        this.servicioCda.deleteUsuario(this.usuario.cedula).subscribe(
          () => {
            this.successMessage = 'Usuario eliminado exitosamente';
            this.errorMessage = '';
            this.resetForm();
            setTimeout(() => (this.successMessage = ''), 4000);
          },
          (error) => {
            this.errorMessage = 'Error al eliminar el usuario.';
            console.error('Error al eliminar usuario:', error);
          }
        );
      }
    }
  }

  resetForm(): void {
    this.usuario = null;
    this.usuarioId = undefined;
    this.errorMessage = '';
  }
}