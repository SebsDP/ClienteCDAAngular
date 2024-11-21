// src/app/services/servicio-cda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/user.model';
import { Vehiculo } from '../model/vehicle.model';
import { QR } from '../model/qr.model';
import { Employee } from '../model/employee.model';
import { Revision } from '../model/revision.model';
import { CertificadoTecnicoMecanica } from '../model/certificado-tecnico-mecanica.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioCdaService {
  private apiUrl = 'http://localhost:8081/CDA';

  constructor(private http: HttpClient) {}

  // Métodos de usuario
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }

  // Métodos para Vehículo
  createVehiculoWithImage(usuarioId: number, vehiculo: Vehiculo, imageFile: File): Observable<Vehiculo> {
    const formData = new FormData();
    formData.append('vehiculo', new Blob([JSON.stringify(vehiculo)], { type: 'application/json' }));
    formData.append('imagen', imageFile);
  
    return this.http.post<Vehiculo>(`${this.apiUrl}/vehiculos/${usuarioId}`, formData);
  }
  

  getVehiculosByUsuarioCedula(usuarioId: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/vehiculos/usuario/${usuarioId}`);
  }  

  getVehiculoByPlacaYUsuario(usuarioId: number, placa: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.apiUrl}/vehiculos/${placa}`);
  }

  getAllVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/vehiculos`);
  }

  getVehiculoByPlaca(placa: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.apiUrl}/vehiculos/${placa}`);
  }

  updateVehiculo(usuarioId: number, placa: string, vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.apiUrl}/vehiculos/${usuarioId}/${placa}`, vehiculo);
  }

  deleteVehiculo(usuarioId: number, placa: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vehiculos/${usuarioId}/${placa}`);
  }

  // Métodos de QR
  createQR(contenido: QR): Observable<QR> {
    return this.http.post<QR>(`${this.apiUrl}/qr`, contenido);
  }

 // Obtener todos los QR
 getAllQRs(): Observable<QR[]> {
  return this.http.get<QR[]>(`${this.apiUrl}/qr`);
}

 // Generate report by year
 generateQRReportByYear(ano: number): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/qr/reporte/${ano}`, {
    responseType: 'blob',
  });
}

// Generate report by year and month
generateQRReportByMonth(ano: number, mes: number): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/qr/reporte/${ano}/${mes}`, {
    responseType: 'blob',
  });
}


  // Métodos de Empleado
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/empleados`, employee);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/empleados`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/empleados/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/empleados/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/empleados/${id}`);
  }

  // Métodos de Revisiones

  createRevision(vehiculoPlaca: string, revision: Revision, username: string): Observable<Revision> {
    const params = new HttpParams().set('username', username);
    return this.http.post<Revision>(`${this.apiUrl}/revisiones/${vehiculoPlaca}`, revision, { params });
  }

  updateRevision(vehiculoPlaca: string, revision: Revision, username: string): Observable<Revision> {
    const params = new HttpParams().set('username', username);
    return this.http.put<Revision>(`${this.apiUrl}/revisiones/${vehiculoPlaca}`, revision, { params });
  }

  getAllRevisions(): Observable<Revision[]> {
    return this.http.get<Revision[]>(`${this.apiUrl}/revisiones`);
  }

  getRevisionById(id: number): Observable<Revision> {
    return this.http.get<Revision>(`${this.apiUrl}/revisiones/${id}`);
  }


}
