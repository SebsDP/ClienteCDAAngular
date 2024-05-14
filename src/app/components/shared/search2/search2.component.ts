import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleModel } from '../../../model/vehicle.model';

@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.css']
})
export class Search2Component {
  @Input() existentIds: VehicleModel[] = [];
  @Output() juegoEncontrado = new EventEmitter<VehicleModel | null>();
  mostrarAlerta: boolean = false;
  mostrarAlertaNo: boolean = false;

  constructor() {}

  buscar(placa: string) {
    if (!placa) {
      console.log('No se ingresó una placa de búsqueda');
      this.mostrarAlerta = true;
      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 5000);
      return;
    }

    console.log('Iniciando búsqueda con placa:', placa);
    const juegoEncontrado = this.existentIds.find(vehiculo => vehiculo.placa === placa);
    if (juegoEncontrado) {
      console.log('Vehículo encontrado:', juegoEncontrado);
      this.juegoEncontrado.emit(juegoEncontrado);
    } else {
      console.error('El vehículo no pudo ser encontrado');
      this.juegoEncontrado.emit(null); // Emitir null cuando no se encuentra el vehículo
      this.mostrarAlertaNo = true;
      setTimeout(() => {
        this.mostrarAlertaNo = false;
      }, 5000);
    }
  }
}
