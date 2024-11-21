import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/CDA'; // URL base de tu API

  constructor(private http: HttpClient) {}

  // Método para realizar el login
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap((response) => {
        if (response && response.role) {
          localStorage.setItem('username', response.username); // Guardar el username
          localStorage.setItem('role', response.role); // Guardar el rol
        }
      }),
      catchError((error) => {
        console.error('Error al realizar la solicitud de login:', error);
        return of({ error: 'Login failed' }); // Devolver un objeto con el error
      })
    );
  }

  // Método para obtener el username almacenado
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Método para obtener el rol almacenado
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Método para cerrar sesión y limpiar el localStorage
  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getRole() !== null;
  }
}
