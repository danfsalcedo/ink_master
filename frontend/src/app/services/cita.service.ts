import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../modelos/cita.model';


@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private readonly API_URL='http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.API_URL}/citas`);
  }

  getCita(idCita: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.API_URL}/${idCita}`);
  }

  createCita(data: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.API_URL}/citas`, data);
  }

  updateCita(idCita: number, data: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.API_URL}/citas/${idCita}`, data);
  }
  
  deleteCita(idCita: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/citas/${idCita}`);
  } 
}
