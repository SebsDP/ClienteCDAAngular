// src/app/app-routing.module.ts
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'delete-user', component: DeleteUserComponent },
  { path: 'read-user', component: ReadUserComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'create-vehicle', component: CreateVehicleComponent },
  { path: 'delete-vehicle', component: DeleteVehicleComponent },
  { path: 'read-vehicle', component: ReadVehicleComponent },
  { path: 'update-vehicle', component: UpdateVehicleComponent },
  { path: 'create-qr', component: CreateQrComponent },
  { path: 'read-qr', component: ReadQrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
