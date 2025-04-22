import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cliente } from '../../modelos/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { FormsModule } from "@angular/forms";
import { PaginadorComponent } from '../../componentes/paginador/paginador.component';

@Component({
  selector: 'app-clientes-registrados',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, PaginadorComponent],
  templateUrl: './clientes-registrados.component.html',
  styleUrl: './clientes-registrados.component.css'
})
export class ClientesRegistradosComponent {
  clientes: Cliente[] = [];
  clienteSeleccionado: any = {};
  total: number = 0;
  showPassword: boolean = false;
  paginaActual = 1;
  clientesPorPagina = 5;
  clientesPaginados: Cliente[] = [];

  constructor(
    private clienteService: ClienteService, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadDataIntoTable();
    this.actualizarClientesPaginados();
  }

  private loadDataIntoTable(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientesPaginados = clientes;
      this.total = clientes.length;
      this.paginaActual = 1;
      this.actualizarClientesPaginados();
    });
  }

  openModalEditar(content: any, cliente: Cliente) {
    this.clienteSeleccionado = { ...cliente };     
    this.modalService.open(content, { });
  }

  updateCliente() {
    let datosActualizados = { ...this.clienteSeleccionado };

    if (!this.clienteSeleccionado.contrasenaCliente || this.clienteSeleccionado.contrasenaCliente.trim() === '') {
      delete datosActualizados.contrasenaCliente;
    }
  
    this.clienteService.updateCliente(this.clienteSeleccionado.idCliente, datosActualizados).subscribe(
      (response) => {
        Swal.fire('Éxito', 
          'Cliente actualizado correctamente', 
          'success');
        this.loadDataIntoTable(); // Recargar la tabla
        this.modalService.dismissAll(); 
      },
      (error) => {
        Swal.fire('Error', 
          'No se pudo actualizar al cliente', 
          'error');
      }
    );
  }

  deleteCliente(idCliente: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(idCliente).subscribe(
          () => {
            Swal.fire('Eliminado', 
              'El cliente ha sido eliminado', 
              'success');
            this.loadDataIntoTable(); // Recargar la tabla
          },
          (error) => {
            Swal.fire('Error', 
              'No se pudo eliminar el cliente', 
              'error');
          }
        );
      }
    });
  }

  showPass(event: any) {
    event.target.type = 'text';
  }

  hidePass(event: any) {
    event.target.type = 'password';
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onPaginaSeleccionada(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarClientesPaginados();
  }
  
  actualizarClientesPaginados() {
    const inicio = (this.paginaActual - 1) * this.clientesPorPagina;
    const fin = inicio + this.clientesPorPagina;
    this.clientes = this.clientesPaginados.slice(inicio, fin);
  }
}
