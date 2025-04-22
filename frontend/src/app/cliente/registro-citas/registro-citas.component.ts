import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado } from '../../modelos/empleado.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../services/empleado.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-registro-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro-citas.component.html',
  styleUrl: './registro-citas.component.css'
})
export class RegistroCitasComponent implements OnInit {
  form!: FormGroup;
  empleados: Empleado[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fechaCita: [''],
      horaCita: [''],
      idEmpleado: ['']
    });

    this.obtenerEmpleados();
  }

  onSubmit(){
    if (this.form.valid) {
      const idCliente = this.getIdClienteDesdeToken();
  
      if (!idCliente) {
        Swal.fire({
          icon: 'error',
          title: 'Token inválido',
          text: 'No se pudo obtener el ID del cliente. Inicia sesión nuevamente.'
        });
        return;
      }
  
      const datos = {
        ...this.form.value,
        idCliente: idCliente
      };
  
        this.http.post('http://127.0.0.1:8000/api/citas', datos)
        .subscribe({
          next: (respuesta) => {
            console.log('Datos enviados exitosamente', respuesta, datos);
            Swal.fire({
              icon: 'success',
              title: 'Tu cita se registro exitosamente!',
              showConfirmButton: false,
              timer: 3000
            })
            this.router.navigate(['/inicio']);
          },
          error: (error) => {
            console.error('Error al enviar los datos', error, datos);
            Swal.fire({
              icon: 'error',
              title: 'Registro fallido!',
              text: 'Error al registrar la cita!'
            })
          }
        }); 
      } else{
        console.log('Formulario invalido, corrige los errores antes de enviar');
      }
    }
  
    getIdClienteDesdeToken(): number | null {
      const token = localStorage.getItem('token');
      if (!token) return null;
    
      try {
        const decoded: any = jwtDecode(token);
        return decoded.sub || decoded.id || null; // <-- Usa 'sub' o 'id'
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }

  obtenerEmpleados() {
    this.http.get<Empleado[]>('http://127.0.0.1:8000/api/empleados')
      .subscribe(data => {
        this.empleados = data;
      }, error => {
        console.error('Error al obtener los empleados:', error);
      });
  }
}
