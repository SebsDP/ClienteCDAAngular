// src/app/components/user/create-user/create-user.component.ts
import { Component } from '@angular/core';
import { ServicioCdaService } from "../../../service/servicio-cda.service";
import { Usuario } from "../../../model/user.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  usuario: Usuario = { cedula: undefined, nombre: '', correo: '', vehiculos: [] };
  successMessage: string = '';

  constructor(private servicioCda: ServicioCdaService) {}

  crearUsuario(form: NgForm): void {
    this.servicioCda.createUsuario(this.usuario).subscribe(response => {
      console.log('Usuario creado:', response);
      this.successMessage = 'Usuario registrado exitosamente';
      form.resetForm();
      setTimeout(() => this.successMessage = '', 3000);
    });
  }
}
