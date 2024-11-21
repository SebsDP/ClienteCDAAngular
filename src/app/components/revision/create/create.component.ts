import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Revision } from '../../../model/revision.model';
import { AuthService } from '../../../service/auth.service';
import { ServicioCdaService } from '../../../service/servicio-cda.service';

@Component({
  selector: 'app-revision-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class RevisionCreateComponent {
  usuarioId: number | undefined; // ID del cliente (cédula)
  usuarioEncontrado: boolean = false;
  vehiculos: any[] = []; // Inicializar como un arreglo vacío
  vehiculoPlaca: string = ''; // Placa seleccionada
  vehiculoEncontrado: boolean = false; // Indica si el vehículo fue encontrado
  revision: Revision = {
    fechaRevision: null as unknown as Date, // Fecha de revisión
    resultadoRevision: true, // Resultado de la revisión
    vehiculoPlaca: '', // Placa del vehículo
    empleadoUsername: '', // Usuario empleado
  };
  successMessage: string = '';
  errorMessage: string = '';
  errorVehiculoMessage: string = ''; // Mensaje de error para vehículos
  showAlert: boolean = false;

  constructor(
    private servicioCda: ServicioCdaService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Buscar cliente por cédula y obtener sus vehículos
  buscarCliente(): void {
    if (!this.usuarioId) {
      this.errorMessage = 'Debe ingresar la cédula del usuario.';
      return;
    }

    this.servicioCda.getUsuarioById(this.usuarioId).subscribe(
      () => {
        this.usuarioEncontrado = true;
        this.errorMessage = '';
      },
      () => {
        this.usuarioEncontrado = false;
        this.errorMessage = 'No se encontró un cliente con esa cédula.';
      }
      
    );
    this.servicioCda.getVehiculosByUsuarioCedula(this.usuarioId).subscribe({
      next: (vehiculos) => {
        this.vehiculos = vehiculos;
        this.errorMessage = '';
        this.errorVehiculoMessage =
          vehiculos.length === 0
            ? 'No se encontraron vehículos registrados para este cliente.'
            : '';
      },
      error: () => {
        this.vehiculos = [];
        this.errorVehiculoMessage = 'No se encontró un cliente con esa cédula.';
        this.errorMessage = '';
      },
    });
  }

  // Seleccionar un vehículo de la lista desplegable
  seleccionarVehiculo(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Aseguramos que el target sea un elemento HTMLSelectElement
    this.vehiculoPlaca = selectElement.value; // Extraemos el valor seleccionado
    this.vehiculoEncontrado = !!this.vehiculoPlaca; // Actualizamos el estado de "vehiculoEncontrado"
  }
  

  // Crear una nueva revisión
   // Create a new revision
   crearRevision(): void {
    const username = this.authService.getUsername(); // Get the logged-in username

    // Validate required fields
    if (!this.vehiculoPlaca) {
      this.errorMessage = 'Debe ingresar la placa del vehículo.';
      this.hideMessageAfterTimeout();
      return;
    }

    if (!this.revision.fechaRevision) {
      this.errorMessage = 'Debe ingresar la fecha de revisión.';
      this.hideMessageAfterTimeout();
      return;
    }

    if (username) {
      this.revision.empleadoUsername = username; // Add the username to the revision object

      this.servicioCda.createRevision(this.vehiculoPlaca, this.revision, username).subscribe({
        next: () => {
          this.successMessage = 'Revisión registrada exitosamente.';
          this.errorMessage = '';
          this.resetForm();
          this.hideMessageAfterTimeout();
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar la revisión. Intente nuevamente.';
          this.successMessage = '';
          this.hideMessageAfterTimeout();
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'No se encontró el usuario autenticado. Por favor, inicie sesión.';
      this.hideMessageAfterTimeout();
    }
  }

  // Restablecer el formulario después del registro exitoso
  resetForm(): void {
    this.usuarioId = undefined;
    this.vehiculos = [];
    this.vehiculoPlaca = '';
    this.vehiculoEncontrado = false;
    this.revision = {
      fechaRevision: null as unknown as Date, // Restablecer la fecha
      resultadoRevision: true,
      vehiculoPlaca: '',
      empleadoUsername: '', // Restablecer el campo de usuario
    };
  }

  // Ocultar mensajes después de un tiempo
  hideMessageAfterTimeout(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
      this.errorVehiculoMessage = '';
    }, 3000); // 3 segundos de espera
  }
}
