import {Component, Output} from '@angular/core';
import {VehicleModel} from "../../../model/vehicle.model";
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  mostrarForm: boolean = false;
  mostrarForm2: boolean = false;
  mostrarAlertaID: boolean = false
  mostrarAlerta: boolean = false;
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

  eliminarVideojuego(usuarioId: number, id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este vehiculo?')) {
      this.service.eliminarVehiculo(usuarioId, id).subscribe({
        next: () => {
          console.log('vehiculo eliminado correctamente');
          this.formVideojuego.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el vehiculo', error);
        }
      });
    }
  }




  onJuegoEncontrado(juego: VehicleModel | null): void {
    if (juego) {
      this.mostrarForm2 = true;
      console.log(juego)
      this.juegoEncontrado = juego;
      this.formVideojuego.patchValue({
        placa: this.juegoEncontrado.placa,
        haySoat: this.juegoEncontrado.haySoat.toString(),
        resultTecno: this.juegoEncontrado.resultTecno.toString(),
        fecha: this.juegoEncontrado.fecha
      });
    } else {
      this.juegoEncontrado = null;
      this.formVideojuego.reset();
    }
  }
}
