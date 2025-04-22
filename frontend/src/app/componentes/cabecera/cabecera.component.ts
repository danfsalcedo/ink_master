import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  
  constructor(private authService: AuthService, private sanitizer: DomSanitizer) {}

  // Obtiene el tipo de usuario desde el AuthService (ahora incluye administrador)
  get userType(): 'cliente' | 'empleado' | 'administrador' | null {
    return this.authService.getUserType();
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Métodos específicos para cada rol
  isCliente(): boolean {
    return this.authService.isCliente();
  }

  isEmpleado(): boolean {
    return this.authService.isEmpleado();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  
  onLogout() {
    this.authService.logout();
  }
}