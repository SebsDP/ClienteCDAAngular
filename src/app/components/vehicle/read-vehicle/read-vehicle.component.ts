import {Component, OnInit} from '@angular/core';
import {ServicioCdaService} from "../../../service/servicio-cda.service";
import { VehicleModel } from '../../../model/vehicle.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit {
  listVideojuegos: VehicleModel [] = [];
  id: string = "";

  constructor(private servicio: ServicioCdaService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['placa']
      this.listar(this.id);
    })
  }

  listar(placa: string) {
    this.servicio.leerVehiculo(placa).subscribe((data: any) => {
      if (data) {
        this.listVideojuegos = data.filter((item: VehicleModel) => {
          return true; // Este filtro no está haciendo nada, deberías definir tu lógica aquí
        });
      }
    });
  }


}
