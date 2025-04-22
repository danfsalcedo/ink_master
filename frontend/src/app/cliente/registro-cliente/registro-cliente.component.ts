import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, CommonModule, NgbPopoverModule],
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css'
})
export class RegistroClienteComponent{

  form:FormGroup;

  constructor(private http: HttpClient, private router: Router){
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return new FormGroup({
      correoCliente: new FormControl('', [Validators.required, Validators.email]),
      nombreCliente: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      apellidoCliente: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      telefonoCliente: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      contrasenaCliente: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }

  onSubmit(){
    if (this.form.valid) {
      const datos = this.form.value;
      this.http.post(`${environment.apiUrl}/clientes`, datos)
      .subscribe({
        next: (response) => this.successForm(response),
        error: (error) => this.failedForm(error)
      }); 
    } else{
      console.log('Formulario invalido, corrige los errores antes de enviar');
    }
  }

  private successForm(response: any): void{
    console.log('Datos enviados exitosamente', response);
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso!',
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['/login']);
  }

  private failedForm(error: any): void{
    console.error('Error al enviar los datos', error);
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Tu correo ya se encuentra registrado.'
    });
  }
}
