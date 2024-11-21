import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  activeMenu: string | null = null; // Controla el menú activo
  private globalClickListener: (() => void) | undefined;

  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Determinar si el usuario tiene rol de administrador
    this.isAdmin = this.authService.getRole() === 'ADMIN';
    this.isEmployee = this.authService.getRole() === 'EMPLOYEE';

    // Escucha los clics en cualquier lugar de la página
    this.globalClickListener = this.renderer.listen('document', 'click', () => {
      this.closeAllMenus();
    });
  }

  ngOnDestroy(): void {
    // Destruir el listener para evitar fugas de memoria
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }

  // Método para alternar el menú específico y cerrar los demás
  toggleMenu(menu: string, event: Event): void {
    event.stopPropagation(); // Evita que el clic cierre el menú
    this.activeMenu = this.activeMenu === menu ? null : menu; // Alterna el estado del menú
  }

  // Cierra todos los menús
  closeAllMenus(): void {
    this.activeMenu = null;
  }

  // Cierra los menús y navega a la ruta deseada
  closeMenusAndNavigate(): void {
    this.closeAllMenus();
  }

  // Redirige al "Inicio" según el rol del usuario
  goToHome(): void {
    if (this.isAdmin) {
      this.router.navigate(['/admin-home']);
    } else {
      this.router.navigate(['/employee-home']);
    }
  }

  exit(): void {
      this.router.navigate(['/login']);
    }
}
