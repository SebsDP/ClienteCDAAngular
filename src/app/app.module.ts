// src/app/app.module.ts
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
    ReadQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
