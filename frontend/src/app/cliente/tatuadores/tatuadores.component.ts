import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PerfilEmpleado } from '../../modelos/perfil-empleado.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
//

@Component({
  selector: 'app-tatuadores',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tatuadores.component.html',
  styleUrl: './tatuadores.component.css'
})
export class TatuadoresComponent implements OnInit{
  perfiles: PerfilEmpleado[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPerfiles();
  }

  obtenerPerfiles(): void {
    this.http.get<PerfilEmpleado[]>('http://127.0.0.1:8000/api/perfil')
      .subscribe(data => {
        this.perfiles = data.map(perfil => ({
          ...perfil,
          // Ajustamos la ruta de la imagen según Laravel
          fotoEmpleado: `http://127.0.0.1:8000/storage/${perfil.fotoEmpleado}`,
        }));
      }, error => {
        console.error('Error al obtener los perfiles:', error);
      });
  }
}