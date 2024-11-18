import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    this.errorMessage = ''; // Limpiar mensaje de error antes de intentar autenticar
    this.authService.login(this.username, this.password).subscribe((response) => {
      if (response && response.role) {
        const role = this.authService.getRole();
        // Redirigir según el rol del usuario
        if (role === 'ADMIN') {
          this.router.navigate(['/admin-home']);
        } else if (role === 'EMPLOYEE') {
          this.router.navigate(['/employee-home']);
        } else {
          this.errorMessage = 'Rol desconocido. Contacte al administrador.';
        }
      } else {
        // Mostrar error si la autenticación falla
        this.errorMessage = 'Credenciales incorrectas. Intente de nuevo.';
      }
    });
  }
}
