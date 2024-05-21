// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClienteCDAAngular';
  showUserMenu = false;
  showVehicleMenu = false;
  showQrMenu = false;

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
    this.showVehicleMenu = false;
    this.showQrMenu = false;
  }

  toggleVehicleMenu(event: Event) {
    event.stopPropagation();
    this.showVehicleMenu = !this.showVehicleMenu;
    this.showUserMenu = false;
    this.showQrMenu = false;
  }

  toggleQrMenu(event: Event) {
    event.stopPropagation();
    this.showQrMenu = !this.showQrMenu;
    this.showUserMenu = false;
    this.showVehicleMenu = false;
  }

  closeMenus() {
    this.showUserMenu = false;
    this.showVehicleMenu = false;
    this.showQrMenu = false;
  }
}
