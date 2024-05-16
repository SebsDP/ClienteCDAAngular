import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateComponent implements OnInit {

  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  mostrarForm: boolean = false;
  existentPlacas: string[] = [];
  formVehiculo: FormGroup = new FormGroup({});
  usuarioEncontrado: UserModel | null = null;

  constructor(private service: ServicioCdaService) { }

  ngOnInit(): void {
    this.formVehiculo = new FormGroup({
      placa: new FormControl('', [Validators.required]),
      haySoat: new FormControl('', [Validators.required]),
      resultTecno: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required])
    });

  }

  crearVehiculo() {
    if (this.formVehiculo.valid) {
      if (!this.usuarioEncontrado) {
        return;
      }

      const cedulaUsuario = this.usuarioEncontrado.cedula;
      const placaVehiculo = this.formVehiculo.get('placa')?.value;

      let vehiculoExistente = false;
      for (let i = 0; i < this.existentPlacas.length; i++) {
        if (this.existentPlacas[i] === placaVehiculo) {
          vehiculoExistente = true;
          break;
        }
      }

      if (this.existentPlacas.includes(placaVehiculo)) {
        this.mostrarAlertaID = true;
        setTimeout(() => {
          this.mostrarAlertaID = false;
        }, 5000);
        return;
      } else {
        const vehiculoData = {
          ...this.formVehiculo.value,
          cedulaU : cedulaUsuario
        };

        this.service.agregarVehiculos(cedulaUsuario, vehiculoData).subscribe(resp => {
          if (resp) {
            this.formVehiculo.reset();
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
    Object.values(this.formVehiculo.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onUserEncontrado(user: UserModel | null): void {
    this.usuarioEncontrado = user;
    if (user) {
      this.mostrarForm = true;
      this.service.leerVehiculo(user.cedula).subscribe(vehiculos => {
        this.existentPlacas = vehiculos.map(vehiculo => vehiculo.placa);
        console.log('Lista de plcas de Vehiculos:', this.existentPlacas);
      });
    } else {
      this.formVehiculo.reset();
    }
  }
}
