// src/app/app.component.ts
import { Component, Renderer2, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'ClienteCDAAngular';
  showUserMenu = false;
  showVehicleMenu = false;
  showQrMenu = false;
  private clickListener: () => void;
  isLoginPage: boolean = false;

  constructor(private renderer: Renderer2, private router: Router) {
    // Añade el listener para cerrar los menús cuando se hace clic fuera de ellos
    this.clickListener = this.renderer.listen('document', 'click', () => this.closeMenus());

    // Escucha los cambios en la ruta para determinar si estamos en la página de login
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.isLoginPage = event.url === '/login';
    });
  }

  toggleMenu(menuType: 'user' | 'vehicle' | 'qr', event: Event) {
    event.stopPropagation();
    this.showUserMenu = menuType === 'user' ? !this.showUserMenu : false;
    this.showVehicleMenu = menuType === 'vehicle' ? !this.showVehicleMenu : false;
    this.showQrMenu = menuType === 'qr' ? !this.showQrMenu : false;
  }

  closeMenus() {
    this.showUserMenu = false;
    this.showVehicleMenu = false;
    this.showQrMenu = false;
  }

  closeMenusAndNavigate() {
    this.closeMenus();
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.clickListener();
    }
  }
}
