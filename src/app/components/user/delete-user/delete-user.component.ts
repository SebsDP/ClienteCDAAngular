import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  mostrarAlertaID: boolean = false
  mostrarAlerta: boolean = false;
  formUser: FormGroup = new FormGroup({});
  existentIds: number[] = [];

  constructor(private service: ServicioCdaService) { }

  ngOnInit(): void {
    this.obtenerIdsExistentes();

    this.formUser = new FormGroup({
      cedula: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required])
    });
  }

  obtenerIdsExistentes() {
    this.service.leerUsuarios().subscribe(usuarios => {
      this.existentIds = usuarios.map(usuarios => usuarios.cedula);
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Desea eliminar el usuario?')) {
      this.service.eliminarUsuarios(id).subscribe({
        next: () => {
          console.log('Usuario eliminado con exito');
          this.formUser.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);

        },
        error: (error) => {
          console.error('No se pudo eliminar el usuario', error);
        }
      });
    }
  }

  onUsuarioEncontrado(usuario: UserModel | null): void {
    if (usuario) {
      this.formUser.patchValue({
        id: usuario.cedula,
        nombre: usuario.nombre,
        correo: usuario.correo
      });
    } else {
      this.formUser.reset();
    }
  }
}
