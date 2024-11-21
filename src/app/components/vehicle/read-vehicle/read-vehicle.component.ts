import { Component, OnInit } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Vehiculo } from '../../../model/vehicle.model';

@Component({
  selector: 'app-read-vehicle',
  templateUrl: './read-vehicle.component.html',
  styleUrls: ['./read-vehicle.component.css']
})
export class ReadVehicleComponent implements OnInit {
  usuarioId: number | undefined;
  placa: string | undefined;
  vehiculos: Vehiculo[] = [];
  filteredVehiculos: Vehiculo[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  filterType: 'all' | 'cedula' | 'placa' = 'all';

  constructor(private servicioCda: ServicioCdaService) {}

  ngOnInit(): void {
    this.cargarTodosVehiculos();
  }

  cargarTodosVehiculos(): void {
    this.servicioCda.getAllVehiculos().subscribe({
      next: (response) => {
        this.vehiculos = response;
        this.filteredVehiculos = response;
        this.errorMessage = '';
        setTimeout(() => (this.successMessage = ''), 5000);
      },
      error: () => {
        this.errorMessage = 'Error al cargar todos los vehículos.';
        this.successMessage = '';
        setTimeout(() => (this.errorMessage = ''), 5000);
      }
    });
  }

  cambiarFiltro(tipo: 'all' | 'cedula' | 'placa'): void {
    this.filterType = tipo;
    if (tipo === 'all') {
      this.filteredVehiculos = this.vehiculos;
    } else {
      this.filteredVehiculos = [];
    }
  }

  buscarVehiculos(): void {
    if (this.filterType === 'cedula' && this.usuarioId !== undefined) {
      this.servicioCda.getVehiculosByUsuarioCedula(this.usuarioId).subscribe({
        next: (response) => {
          this.filteredVehiculos = response;
          this.errorMessage = '';
          setTimeout(() => (this.successMessage = ''), 4000);
        },
        error: () => {
          this.filteredVehiculos = [];
          this.errorMessage = 'No se encontraron vehículos para este cliente.';
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 4000);
        }
      });
    } else if (this.filterType === 'placa' && this.placa) {
      this.servicioCda.getVehiculoByPlaca(this.placa).subscribe({
        next: (response) => {
          this.filteredVehiculos = [response];
          this.errorMessage = '';
          setTimeout(() => (this.successMessage = ''), 4000);
        },
        error: () => {
          this.filteredVehiculos = [];
          this.errorMessage = 'No se encontró un vehículo con esa placa.';
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 4000);
        }
      });
    }
  }
}
