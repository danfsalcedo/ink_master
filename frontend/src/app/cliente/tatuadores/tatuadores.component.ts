import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PerfilEmpleado } from '../../modelos/perfil-empleado.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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
    this.http.get<PerfilEmpleado[]>(`${environment.apiUrl}/perfil`)
      .subscribe(data => {
        this.perfiles = data.map(perfil => ({
          ...perfil,
          // Ajustamos la ruta de la imagen según Laravel
          fotoEmpleado: `${environment.storageUrl}/api/storage/${perfil.fotoEmpleado}`,
        }));
      }, error => {
        console.error('Error al obtener los perfiles:', error);
      });
  }
}