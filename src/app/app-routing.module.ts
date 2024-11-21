import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { ReadEmployeeComponent } from './components/employee/read-employee/read-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './components/employee/delete-employee/delete-employee.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { RevisionCreateComponent } from './components/revision/create/create.component';
import { ReporteComponent } from './components/qr/reporte/reporte.component'; // Corrige el import del componente de reporte

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin-home', component: AdminHomeComponent }, // Vista del administrador
  { path: 'employee-home', component: EmployeeHomeComponent }, // Vista del empleado

  // Rutas de empleados
  { path: 'create-employee', component: CreateEmployeeComponent },
  { path: 'read-employee', component: ReadEmployeeComponent },
  { path: 'update-employee', component: UpdateEmployeeComponent },
  { path: 'delete-employee', component: DeleteEmployeeComponent },

  // Rutas de usuarios
  { path: 'create-user', component: CreateUserComponent },
  { path: 'delete-user', component: DeleteUserComponent },
  { path: 'read-user', component: ReadUserComponent },
  { path: 'update-user', component: UpdateUserComponent },

  // Rutas de vehículos
  { path: 'create-vehicle', component: CreateVehicleComponent },
  { path: 'delete-vehicle', component: DeleteVehicleComponent },
  { path: 'read-vehicle', component: ReadVehicleComponent },
  { path: 'update-vehicle', component: UpdateVehicleComponent },

  // Rutas de QR
  { path: 'create-qr', component: CreateQrComponent },
  { path: 'read-qr', component: ReadQrComponent },
  { path: 'qr-reporte', component: ReporteComponent }, // Ruta para generar reportes de QR

  // Rutas de revisiones
  { path: 'create-revision', component: RevisionCreateComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Restaura la posición al inicio automáticamente
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
