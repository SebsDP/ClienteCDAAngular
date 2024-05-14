import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  mostrarForm: boolean = false;
  existentIds: string[] = [];
  formVideojuego: FormGroup = new FormGroup({});
  usuarioEncontrado: UserModel | null = null;

  constructor(private service: ServicioCdaService) { }

  ngOnInit(): void {
    this.formVideojuego = new FormGroup({
      placa: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      haySoat: new FormControl('', [Validators.required]),
      resultTecno: new FormControl('', [Validators.required]),
      fechaLanzamiento: new FormControl('', [Validators.required])
    });

  }

  crearVideojuego() {
    if (this.formVideojuego.valid) {
      if (!this.usuarioEncontrado) {
        return;
      }

      const idUsuario = this.usuarioEncontrado.cedula;
      const idJuego = this.formVideojuego.get('placa')?.value;

      let juegoExistente = false;
      for (let i = 0; i < this.existentIds.length; i++) {
        if (this.existentIds[i] === idJuego) {
          juegoExistente = true;
          break;
        }
      }

      if (this.existentIds.includes(idJuego)) {
        this.mostrarAlertaID = true;
        setTimeout(() => {
          this.mostrarAlertaID = false;
        }, 5000);
        return;
      } else {
        const videojuegoData = {
          ...this.formVideojuego.value,
          usuarioId: idUsuario
        };

        this.service.agregarVehiculos(idUsuario, videojuegoData).subscribe(resp => {
          if (resp) {
            this.formVideojuego.reset();
            this.mostrarAlerta = true;
            setTimeout(() => {
              this.mostrarAlerta = false;
            }, 5000);
          }
        });
      }
    } else {
      this.marcarControlesComoTocados();
    }
  }

  private marcarControlesComoTocados() {
    Object.values(this.formVideojuego.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
