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
    soat: '',
    tipoVehiculo: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  placaError: string = ''; // Mensaje de error para la placa
  soatError: string = ''; // Mensaje de error para el SOAT
  imagePreview: string | null = null; // Previsualización de la imagen
  isSubmitting: boolean = false; // Estado para deshabilitar el botón mientras se registra el vehículo
  placaRegex: RegExp = /^[A-Z]{3}\d{3}$/; // Expresión regular para validar el formato de la placa

  constructor(private servicioCda: ServicioCdaService) {}

  // Buscar usuario por cédula
  buscarUsuario(): void {
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
  }

  // Verificar si la placa ya existe y tiene el formato correcto
  verificarPlaca(): void {
    if (!this.vehiculo.placa || this.vehiculo.placa.trim() === '') {
      this.placaError = 'La placa es obligatoria.';
      return;
    }

    // Validar formato de la placa
    if (!this.placaRegex.test(this.vehiculo.placa)) {
      this.placaError = 'La placa no cumple con el formato.';
      return;
    }

    // Validar si la placa ya existe
    this.servicioCda.getVehiculoByPlaca(this.vehiculo.placa).subscribe(
      () => {
        this.placaError = 'Ya existe un vehículo registrado con esta placa.';
      },
      (error) => {
        if (error.status === 404) {
          this.placaError = ''; // La placa no existe
        } else {
          this.placaError = 'Error al verificar la placa. Intente nuevamente.';
        }
      }
    );
  }

  // Previsualizar la imagen seleccionada
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0]; // Obtener el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Asignar el resultado a `imagePreview`
      };
      reader.readAsDataURL(file); // Leer el archivo como Data URL
    } else {
      this.imagePreview = null; // Limpiar la previsualización si no hay archivo seleccionado
    }
  }
  

  crearVehiculo(form: NgForm, imageInput: HTMLInputElement): void {
    const imageFile = imageInput.files ? imageInput.files[0] : null;

    if (!this.usuarioId || !this.vehiculo.placa || !this.vehiculo.fecha || !this.vehiculo.tipoVehiculo) {
      this.errorMessage = 'Por favor, llene todos los campos.';
      return;
    }

    // Validación del SOAT
    if (this.vehiculo.soat === 'false') {
      this.soatError = 'El vehículo no puede ser registrado porque su SOAT está vencido.';
      return;
    } else {
      this.soatError = ''; // Limpiar error si el SOAT es válido
    }

    if (!imageFile) {
      this.errorMessage = 'Debe seleccionar una imagen para el vehículo.';
      return;
    }

    if (this.isSubmitting) {
      return; // Evitar múltiples envíos
    }

    this.isSubmitting = true;

    this.servicioCda.createVehiculoWithImage(this.usuarioId, this.vehiculo, imageFile).subscribe(
      () => {
        this.successMessage = 'Vehículo registrado exitosamente.';
        this.errorMessage = '';
        form.resetForm();
        this.imagePreview = null; // Limpiar la vista previa de la imagen
        this.usuarioEncontrado = false;
        this.isSubmitting = false;
        setTimeout(() => (this.successMessage = ''), 4000);
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Ya existe un vehículo registrado con esa placa.';
        } else {
          this.errorMessage = 'Error al registrar el vehículo.';
        }
        this.successMessage = '';
        this.isSubmitting = false;
      }
    );
  }
}
