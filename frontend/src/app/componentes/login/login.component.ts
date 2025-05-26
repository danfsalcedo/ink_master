import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ){
    this.form = new FormGroup({
      correo: new FormControl(''),
      contrasena: new FormControl('')
    });
  }

  onLogin() {
    if (this.form.valid) {
      const datos = this.form.value;
      this.http.post<any>(`${environment.apiUrl}/api/login`, datos)
      .subscribe({
        next: (respuesta: any) => {
          this.authService.login(respuesta.token, respuesta.tipo, respuesta.idCliente || respuesta.idEmpleado || respuesta.isAdmin);
          
          if (respuesta.tipo === 'empleado' && respuesta.idEmpleado) {
            localStorage.setItem('idEmpleado', respuesta.idEmpleado.toString());
          }

          // Redirección basada en el rol
          if (respuesta.tipo === 'cliente') {
            this.router.navigate(['/inicio']);
          } else if (respuesta.tipo === 'empleado') {
            this.router.navigate(['/inicio']);
          } else if (respuesta.tipo === 'administrador') {
            this.router.navigate(['/inicio']);
          }
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
        }
      });
    } else {
      console.log('Formulario no valido');
    }
  }
}
