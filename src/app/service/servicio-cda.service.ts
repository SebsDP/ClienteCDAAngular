// src/app/services/servicio-cda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/user.model';
import { Vehiculo } from '../model/vehicle.model';
import { QR } from '../model/qr.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioCdaService {
  private apiUrl = 'http://localhost:8080/CDA';

  constructor(private http: HttpClient) {}

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }


  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  getUsuarioById(id: number | undefined): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  updateUsuario(id: number | undefined, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  deleteUsuario(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }

  // Métodos de vehículo
  createVehiculo(usuarioId: number | undefined, vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.apiUrl}/vehiculos/${usuarioId}`, vehiculo);
  }

  getVehiculosByUsuarioCedula(usuarioId: number | undefined): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/vehiculos/${usuarioId}`);
  }

  getVehiculoByPlacaYUsuario(usuarioId: number | undefined, placa: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.apiUrl}/vehiculos/${usuarioId}/${placa}`);
  }

  updateVehiculo(usuarioId: number | undefined, placa: string, vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.apiUrl}/vehiculos/${usuarioId}/${placa}`, vehiculo);
  }

  deleteVehiculo(usuarioId: number | undefined, placa: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vehiculos/${usuarioId}/${placa}`);
  }

  // QR methods
  createQR(contenido: QR): Observable<QR> {
    return this.http.post<QR>(`${this.apiUrl}/qr`, { quejasRecomendaciones: contenido });
  }

  getAllQRs(): Observable<QR[]> {
    return this.http.get<QR[]>(`${this.apiUrl}/qr`);
  }
}
