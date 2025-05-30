import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../modelos/empleado.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private readonly API_URL=environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

    getEmpleados(): Observable<Empleado[]> {
      return this.http.get<Empleado[]>(`${this.API_URL}/empleados`);
    }
  
    getEmpleado(idEmpleado: number): Observable<Empleado> {
      return this.http.get<Empleado>(`${this.API_URL}/${idEmpleado}`);
    }
  
    createEmpleado(data: Empleado): Observable<Empleado> {
      return this.http.post<Empleado>(`${this.API_URL}/empleados`, data);
    }
  
    updateEmpleado(idEmpleado: number, data: Empleado): Observable<Empleado> {
      return this.http.put<Empleado>(`${this.API_URL}/empleados/${idEmpleado}`, data);
    }
    
    deleteEmpleado(idEmpleado: number): Observable<any> {
      return this.http.delete<any>(`${this.API_URL}/empleados/${idEmpleado}`);
    } 
}
