import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCdaService } from '../../../service/servicio-cda.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  existentIds: number[] = [];
  formUser: FormGroup = new FormGroup({});

  constructor(private service: ServicioCdaService) { }

  ngOnInit(): void {
    this.obtenerIdsExistentes();

    this.formUser = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required])
    });

  }

  obtenerIdsExistentes() {
    this.service.leerUsuarios().subscribe(usuarios => {
      this.existentIds = usuarios.map(usuario => usuario.cedula);
    });
  }

  crearUsuario() {
    if (this.formUser.valid) {
      const id = this.formUser.get('cedula')?.value;
      if (this.existentIds == id) {
        this.mostrarAlertaID = true;
        setTimeout(() => {
          this.mostrarAlertaID = false;
        }, 5000);
        return;
      }
      this.service.agregarUsuarios(this.formUser.value).subscribe(resp => {
        if (resp) {
          console.log(resp);
          this.formUser.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
        }
      });
    } else {
      this.marcarControlesComoTocados();
    }
  }

  private marcarControlesComoTocados() {
    Object.values(this.formUser.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
