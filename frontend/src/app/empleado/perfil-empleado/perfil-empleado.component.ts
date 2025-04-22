import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilEmpleadoService } from '../../services/perfil-empleado.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './perfil-empleado.component.html',
  styleUrl: './perfil-empleado.component.css'
})
export class PerfilEmpleadoComponent implements OnInit {
  perfilForm!: FormGroup;
  idEmpleado!: number;
  selectedFile!: File;


  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilEmpleadoService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('No se ha podido obtener el ID del empleado. Redirigiendo...');
      // Redirige o maneja el error
      return;
    }

    this.idEmpleado = userId;

    this.perfilForm = this.fb.group({
      fotoEmpleado: [''],
      historiaEmpleado: [''],
      experienciaEmpleado: [''],
      enfoquesEmpleado: ['']
    });
  
    this.perfilService.getPerfil(this.idEmpleado).subscribe(perfil => {
      if (perfil) {
        this.perfilForm.patchValue(perfil);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
    } else {
      alert('Por favor selecciona un archivo de imagen válido');
    }
  }

  guardarPerfil(): void {
    const formData = new FormData();
    formData.append('idEmpleado', this.idEmpleado.toString());
  
    if (this.selectedFile) {
      formData.append('fotoEmpleado', this.selectedFile);
    }
  
    formData.append('historiaEmpleado', this.perfilForm.get('historiaEmpleado')?.value || '');
    formData.append('experienciaEmpleado', this.perfilForm.get('experienciaEmpleado')?.value || '');
    formData.append('enfoquesEmpleado', this.perfilForm.get('enfoquesEmpleado')?.value || '');
  
    this.perfilService.guardarPerfil(formData).subscribe({
      next: (res) => {
        alert('Perfil guardado exitosamente');
      },
      error: (err) => {
        console.error(err);
        alert('Hubo un error al guardar el perfil');
      }
    });
  }

}
