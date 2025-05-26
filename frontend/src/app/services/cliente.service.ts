import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API_URL= environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.API_URL}/clientes`);
  }

  getCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API_URL}/${idCliente}`);
  }

  createCliente(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.API_URL}/clientes`, data);
  }

  updateCliente(idCliente: number, data: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API_URL}/clientes/${idCliente}`, data);
  }
  
  deleteCliente(idCliente: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/clientes/${idCliente}`);
  } 
}
