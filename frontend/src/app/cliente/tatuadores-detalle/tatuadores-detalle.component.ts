import { Component, OnInit } from '@angular/core';
import { PerfilEmpleado } from '../../modelos/perfil-empleado.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerfilEmpleadoService } from '../../services/perfil-empleado.service';

@Component({
  selector: 'app-tatuadores-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tatuadores-detalle.component.html',
  styleUrl: './tatuadores-detalle.component.css'
})
export class TatuadoresDetalleComponent implements OnInit {
  perfil: PerfilEmpleado | null = null;

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilEmpleadoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.perfilService.getPerfil(id).subscribe({
        next: (data) => {
          this.perfil = {
            ...data,
            fotoEmpleado: `http://127.0.0.1:8000/storage/${data.fotoEmpleado}`
          };
        },
        error: (error) => {
          console.error('Error al obtener perfil:', error);
        }
      });
    }
  }
}