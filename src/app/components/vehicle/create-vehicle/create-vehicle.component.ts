import { Component } from '@angular/core';
import { ServicioCdaService } from '../../../service/servicio-cda.service';
import { Vehiculo } from '../../../model/vehicle.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent {
  usuarioId: number | undefined;
  usuarioEncontrado: boolean = false;
  vehiculo: Vehiculo = {
    placa: '',
    fecha: new Date(),
    soat: false,
    tipoVehiculo: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  imagePreview: string | null = null; // Previsualización de la imagen
  isSubmitting: boolean = false; // Estado para deshabilitar el botón mientras se registra el vehículo

  constructor(private servicioCda: ServicioCdaService) {}

  // Buscar usuario por cédula
  buscarUsuario(): void {
    if (!this.usuarioId) {
      this.errorMessage = 'Debe ingresar la cédula del usuario.';
      this.mostrarAlerta();
      return;
    }

    this.servicioCda.getUsuarioById(this.usuarioId).subscribe(
      () => {
        this.usuarioEncontrado = true;
        this.errorMessage = '';
      },
      () => {
        this.usuarioEncontrado = false;
        this.errorMessage = 'No se encontró un usuario con esa cédula.';
        this.mostrarAlerta();
      }
    );
  }

  // Previsualizar la imagen seleccionada
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imagePreview = (e.target as FileReader).result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = null; // Limpiar la vista previa si no hay archivo seleccionado
    }
  }

  // Crear un vehículo con imagen
  crearVehiculo(form: NgForm, imageInput: HTMLInputElement): void {
    const imageFile = imageInput.files ? imageInput.files[0] : null;

    if (!this.usuarioId) {
      this.errorMessage = 'Debe ingresar la cédula del usuario.';
      this.mostrarAlerta();
      return;
    }

    if (!imageFile) {
      this.errorMessage = 'Debe seleccionar una imagen para el vehículo.';
      this.mostrarAlerta();
      return;
    }

    if (this.isSubmitting) {
      return; // Evitar múltiples envíos
    }

    this.isSubmitting = true;

    this.servicioCda.createVehiculoWithImage(this.usuarioId, this.vehiculo, imageFile).subscribe(
      () => {
        this.successMessage = 'Vehículo registrado exitosamente.';
        this.alertMessage = this.successMessage;
        this.showAlert = true;
        this.errorMessage = '';
        form.resetForm();
        this.imagePreview = null; // Limpiar la vista previa de la imagen
        this.usuarioEncontrado = false;
        this.isSubmitting = false;
        setTimeout(() => this.cerrarAlerta(), 3000);
      },
      error => {
        this.errorMessage = error.error.message || 'Error al registrar el vehículo.';
        this.mostrarAlerta();
        this.isSubmitting = false;
      }
    );
  }

  // Mostrar alerta
  private mostrarAlerta(): void {
    this.alertMessage = this.errorMessage || this.successMessage;
    this.showAlert = true;
    setTimeout(() => this.cerrarAlerta(), 3000);
  }

  // Cerrar alerta
  private cerrarAlerta(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.showAlert = false;
  }

  // Método para cerrar el modal manualmente
  closeModal(): void {
    this.cerrarAlerta();
  }
}
