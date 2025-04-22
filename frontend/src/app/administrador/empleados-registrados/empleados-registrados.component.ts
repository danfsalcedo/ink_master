import { Component } from '@angular/core';
import { Empleado } from '../../modelos/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginadorComponent } from '../../componentes/paginador/paginador.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados-registrados',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, PaginadorComponent],
  templateUrl: './empleados-registrados.component.html',
  styleUrl: './empleados-registrados.component.css'
})
export class EmpleadosRegistradosComponent {
  empleados: Empleado[] = [];
  empleadoSeleccionado: any = {};
  total: number = 0;
  paginaActual = 1;
  empleadosPorPagina = 5;
  empleadosPaginados: Empleado[] = [];
  nuevoEmpleado: Empleado = {
    nombreEmpleado: '',
    correoEmpleado: '',
    contrasenaEmpleado: '',
    telefonoEmpleado: ''
  };
  
  showPassword: boolean = false;

  constructor(
    private empleadoService: EmpleadoService, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadDataIntoTable();
    this.actualizarEmpleadosPaginados();
  }

  private loadDataIntoTable(): void {
    this.empleadoService.getEmpleados().subscribe( empleados=> {
      this.empleadosPaginados = empleados;
      this.total = empleados.length;
      this.paginaActual = 1;
      this.actualizarEmpleadosPaginados();
    });
  }

  openModalEditar(content: any, empleado: Empleado) {
    this.empleadoSeleccionado = { ...empleado };     
    this.modalService.open(content, { });
  }

  createEmpleado() {
  this.empleadoService.createEmpleado(this.nuevoEmpleado).subscribe(
    () => {
      Swal.fire('Éxito', 'Empleado registrado correctamente', 'success');
      this.loadDataIntoTable(); // Actualiza la tabla
      this.nuevoEmpleado = {
        nombreEmpleado: '',
        correoEmpleado: '',
        contrasenaEmpleado: '',
        telefonoEmpleado: ''
      }; // Limpia el formulario
      this.modalService.dismissAll(); // Cierra el modal
    },
    (error) => {
      Swal.fire('Error', 'No se pudo registrar el empleado', 'error');
    }
  );
}
openModalCrear(content: any) {
  this.modalService.open(content, { centered: true });
}



  updateEmpleado() {
    let datosActualizados = { ...this.empleadoSeleccionado };

    if (!this.empleadoSeleccionado.contrasenaEmpleado || this.empleadoSeleccionado.contrasenaEmpleado.trim() === '') {
      delete datosActualizados.contrasenaEmpleado;
    }
  
    this.empleadoService.updateEmpleado(this.empleadoSeleccionado.idEmpleado, datosActualizados).subscribe(
      (response) => {
        Swal.fire('Éxito', 
          'Empleado actualizado correctamente', 
          'success');
        this.loadDataIntoTable(); // Recargar la tabla
        this.modalService.dismissAll();
      },
      (error) => {
        Swal.fire('Error', 
          'No se pudo actualizar al empleado', 
          'error');
      }
    );
  }

  deleteEmpleado(idEmpleado: number) {
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
        this.empleadoService.deleteEmpleado(idEmpleado).subscribe(
          () => {
            Swal.fire('Eliminado', 
              'El empleado ha sido eliminado', 
              'success');
            this.loadDataIntoTable(); // Recargar la tabla
          },
          (error) => {
            Swal.fire('Error', 
              'No se pudo eliminar el empleado', 
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
    this.actualizarEmpleadosPaginados();
  }
  
  actualizarEmpleadosPaginados() {
    const inicio = (this.paginaActual - 1) * this.empleadosPorPagina;
    const fin = inicio + this.empleadosPorPagina;
    this.empleados = this.empleadosPaginados.slice(inicio, fin);
  }
}
