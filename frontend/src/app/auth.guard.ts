import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    
    // Rutas públicas que no requieren autenticación
    const publicRoutes = ['/inicio', '/login', '/registrate', '/tatuadores', '/info'];
    if (publicRoutes.includes(state.url)) {
      return true;
    }

    // Verifica autenticación
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    // Verificación de roles
    const requiredRole = next.data['requiredRole'];
    if (requiredRole) {
      const userType = this.authService.getUserType();
      
      if (requiredRole === 'cliente' && !this.authService.isCliente()) {
        return this.router.createUrlTree(['/acceso-denegado']);
      }
      if (requiredRole === 'empleado' && !this.authService.isEmpleado()) {
        return this.router.createUrlTree(['/acceso-denegado']);
      }
      if (requiredRole === 'administrador' && !this.authService.isAdmin()) {
        return this.router.createUrlTree(['/acceso-denegado']);
      }
    }

    return true;
  }
}