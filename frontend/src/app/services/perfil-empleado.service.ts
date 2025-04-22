import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PerfilEmpleado } from '../modelos/perfil-empleado.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilEmpleadoService {
  private apiUrl = 'http://localhost:8000/api/perfil';

  constructor(private http: HttpClient) {}

  getPerfil(idEmpleado: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idEmpleado}`).pipe(
      catchError(error => {
        console.error('Error al obtener perfil', error);
        return throwError(() => error);
      })
    );
  }
  
  getPerfiles(): Observable<PerfilEmpleado[]> {
    return this.http.get<PerfilEmpleado[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener perfiles', error);
        return throwError(() => error);
      })
    );
  }
  guardarPerfil(data: FormData) {
    return this.http.post(this.apiUrl, data);
  }
}
