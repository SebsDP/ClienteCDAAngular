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
  cedula: undefined;

  constructor(private servicioCda: ServicioCdaService) {}

  buscarUsuario(): void {
    if (this.cedula !== null) {
      this.servicioCda.getUsuarioById(this.cedula).subscribe(response => {
        this.usuario = response;
      });
    }
  }


  actualizarUsuario(form: NgForm): void {
    this.servicioCda.updateUsuario(this.usuario.cedula, this.usuario).subscribe(response => {
      console.log('Usuario actualizado:', response);
      this.successMessage = 'Usuario actualizado exitosamente';
      form.resetForm();
      setTimeout(() => this.successMessage = '', 3000);
    });
  }
}
