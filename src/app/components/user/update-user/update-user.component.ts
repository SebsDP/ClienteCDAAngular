import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../model/user.model';
import { ServicioCdaService } from '../../../service/servicio-cda.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  formUsuario: FormGroup = new FormGroup({});
  existentIds: number[] = [];
  usuarioEncontrado: UserModel | null = null;

  constructor(private servicioUsuario: ServicioCdaService) { }

  ngOnInit(): void {
    this.obtenerIdsExistentes();

    this.formUsuario = new FormGroup({
      cedula: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
    });
  }

  obtenerIdsExistentes() {
    this.servicioUsuario.leerUsuarios().subscribe(usuarios => {
      this.existentIds = usuarios.map(usuario => usuario.cedula);
    });
  }

  actualizarUsuario() {
    if (this.formUsuario.valid) {
      const id = this.formUsuario.get('cedula')?.value;

      this.servicioUsuario.actualizarUsuarios(id, this.formUsuario.value).subscribe({
        next: (resp) => {
          console.log('Usuario actualizado', resp);
          this.formUsuario.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
        },
        error: (e) => {
          console.error('Error al actualizar usuario', e);
        }
      });
    } else {
      this.marcarControlesComoTocados();
    }
  }

  private marcarControlesComoTocados() {
    Object.values(this.formUsuario.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onUsuarioEncontrado(usuario: UserModel | null): void {
    this.usuarioEncontrado = usuario;
    if (usuario) {
      this.formUsuario.patchValue({
        cedula: usuario.cedula,
        nombre: usuario.nombre,
        correo: usuario.correo,

      });
    } else {
      this.formUsuario.reset();
    }
  }
}
