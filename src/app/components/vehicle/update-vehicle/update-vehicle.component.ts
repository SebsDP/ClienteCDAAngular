import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { UserModel } from '../../../model/user.model';
import { VehicleModel } from '../../../model/vehicle.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  mostrarForm: boolean = false;
  mostrarForm2: boolean = false;
  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  formVideojuego: FormGroup = new FormGroup({});
  existentIds: VehicleModel[] = [];
  usuarioEncontrado: UserModel | null = null;
  juegoEncontrado: VehicleModel | null = null;

  constructor(private service: ServicioCdaService) { }

  ngOnInit(): void {

    this.formVideojuego = new FormGroup({
      placa: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      haySoat: new FormControl('', [Validators.required]),
      resultTecno: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      fecha: new FormControl('', [Validators.required])
    });
  }

  actualizarVideojuego() {
    if (this.formVideojuego.valid) {
      const usuarioId = this.usuarioEncontrado?.cedula;
      const juegoId = this.formVideojuego.get('id')?.value;

      if (usuarioId) {
        this.service.actualizarVehiculo(usuarioId, juegoId, this.formVideojuego.value).subscribe({
          next: (resp) => {
            console.log('Vehiculo actualizado', resp);
            this.formVideojuego.reset();
            this.mostrarAlerta = true;
            setTimeout(() => {
              this.mostrarAlerta = false;
              this.mostrarForm = false;
              this.mostrarForm2 = false;
            }, 3000);
          },
          error: (e) => {
          }
        });
      } else {
        console.error('No se ha seleccionado ningún usuario');
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



  onJuegoEncontrado(juego: VehicleModel | null): void {
    if (juego) {
      this.mostrarForm2 = true;
      console.log(juego)
      this.juegoEncontrado = juego;
      this.formVideojuego.patchValue({
        id: this.juegoEncontrado.placa,
        haySoat: this.juegoEncontrado.haySoat,
        resultTecno: this.juegoEncontrado.resultTecno,
        fecha: this.juegoEncontrado.fecha
      });
    } else {
      this.juegoEncontrado = null;
      this.formVideojuego.reset();
    }
  }
}
