import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { ReadUserComponent } from './components/user/read-user/read-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { CreateVehicleComponent } from './components/vehicle/create-vehicle/create-vehicle.component';
import { DeleteVehicleComponent } from './components/vehicle/delete-vehicle/delete-vehicle.component';
import { ReadVehicleComponent } from './components/vehicle/read-vehicle/read-vehicle.component';
import { UpdateVehicleComponent } from './components/vehicle/update-vehicle/update-vehicle.component';
import { CreateQrComponent } from './components/qr/create-qr/create-qr.component';
import { ReadQrComponent } from './components/qr/read-qr/read-qr.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component'; // Asegúrate de que esta ruta es correcta
import { AuthService } from './service/auth.service';

// Importar componentes de empleados
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { ReadEmployeeComponent } from './components/employee/read-employee/read-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './components/employee/delete-employee/delete-employee.component';
import { RevisionCreateComponent } from './components/revision/create/create.component';
import { ReporteComponent } from './components/qr/reporte/reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateUserComponent,
    DeleteUserComponent,
    ReadUserComponent,
    UpdateUserComponent,
    CreateVehicleComponent,
    DeleteVehicleComponent,
    ReadVehicleComponent,
    UpdateVehicleComponent,
    CreateQrComponent,
    ReadQrComponent,
    LoginComponent,
    NavbarComponent,

    // Agregar los componentes de empleados a declarations
    CreateEmployeeComponent,
    ReadEmployeeComponent,
    UpdateEmployeeComponent,
    DeleteEmployeeComponent,
    RevisionCreateComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
