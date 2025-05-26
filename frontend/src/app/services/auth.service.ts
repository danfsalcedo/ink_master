import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Guarda el token y el tipo de usuario
  login(token: string, userType: 'cliente' | 'empleado' | 'administrador', userId: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userId', userId.toString());
    }
  }

  // Obtiene el token
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('userId');
      return id ? Number(id) : null;
    }
    return null;
  }
  

  // Obtiene el tipo de usuario
  getUserType(): 'cliente' | 'empleado' | 'administrador' | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userType') as any;
    }
    return null;
  }
  
  // Verificadores de rol
  isCliente(): boolean {
    return this.getUserType() === 'cliente';
  }

  isEmpleado(): boolean {
    return this.getUserType() === 'empleado';
  }

  isAdmin(): boolean {
    return this.getUserType() === 'administrador';
  }

  // Cierra sesión
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
    this.router.navigate(['/inicio']);
  }

  // Método para hacer login usando tu backend
  loginBackend(email: string, password: string) {
    // Suponiendo que tu backend recibe email y password en /api/login
    return this.http.post<{token: string, userType: string, userId: number}>(
      `${this.apiUrl}/api/login`,
      { email, password }
    );
  }
}