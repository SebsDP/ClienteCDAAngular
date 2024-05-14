import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, map} from "rxjs";
import { VehicleModel } from '../model/vehicle.model';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioCdaService {

  constructor(private http: HttpClient) { }

  //Vehiculos


  leerVehiculo(placa: string): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`http://localhost:8080/vehiculos/${placa}`);
  }

  agregarVehiculos(placa:number, request: any): Observable<VehicleModel[]>{
    return this.http.post<VehicleModel[]>(`http://localhost:8080/vehiculos/${placa}`, request)
      .pipe(map((data) => data));
  }

  actualizarVehiculo(userid:number, placa: number, vehiculo: VehicleModel): Observable<VehicleModel> {
    return this.http.put<VehicleModel>(`http://localhost:8080/vehiculos/${userid}/${placa}`, vehiculo);
  }

  eliminarVehiculo(usuarioId: number, placa: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/vehiculos/${usuarioId}/${placa}`);
  }

  buscarVehiculo(busqueda?: string): Observable<VehicleModel[]> {
    let params = new HttpParams();

    if (busqueda) {
      if (!isNaN(Number(busqueda))) {
        params = params.set('placa', busqueda);
      } else {
        params = params.set('?', busqueda);
      }
    }

    return this.http.get<VehicleModel[]>('http://localhost:8080/vehiculos/buscar', { params });
  }

  buscarVehiculoUnico(id: number): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`http://localhost:8080/vehiculos/${id}`);
  }

  //Usuarios

  leerUsuarios(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:8080/usuarios');
  }

  agregarUsuarios(request: any): Observable<UserModel[]>{
    return this.http.post<UserModel[]>('http://localhost:8080/usuarios', request)
      .pipe(map((data) => data));
  }

  eliminarUsuarios(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/usuarios/${id}`);
  }

  actualizarUsuarios(id: number, usuario: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`http://localhost:8080/usuarios/${id}`, usuario);
  }

  buscarUsuarioUnico(id: string): Observable<UserModel> {
    const params = { id };
    console.log('Buscando usuario por nombre:', id);

    return this.http.get<UserModel>('http://localhost:8080/usuarios', { params });
  }

  buscarUsuarioParametro(id?: number, nombre?: string): Observable<UserModel[]> {
    let params = new HttpParams();
    if (id) {
      params = params.set('id', id.toString());
    }
    if (nombre) {
      params = params.set('nombre', nombre);
    }

    return this.http.get<UserModel[]>('http://localhost:8080/usuarios', { params });
  }

}
