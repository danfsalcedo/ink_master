import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../modelos/cita.model';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormsModule } from "@angular/forms";
import { PaginadorComponent } from '../../componentes/paginador/paginador.component';

@Component({
  selector: 'app-citas-registradas',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, PaginadorComponent],
  templateUrl: './citas-registradas.component.html',
  styleUrl: './citas-registradas.component.css'
})
export class CitasRegistradasComponent implements OnInit{
 citas: Cita[] = [];
   citaSeleccionado: any = {};
   total: number = 0;
   paginaActual = 1;
   citasPorPagina = 5;
   citasPaginadas: Cita[] = [];
 
   constructor(
     private citaService: CitaService, private modalService: NgbModal
   ) { }
 
   ngOnInit(): void {
     this.loadDataIntoTable();
     this.actualizarCitasPaginadas();
   }
 
   private loadDataIntoTable(): void {
     this.citaService.getCitas().subscribe(citas => {
       this.citasPaginadas = citas;
       this.total = citas.length;
       this.paginaActual = 1;
       this.actualizarCitasPaginadas();
     });
   }
 
   openModalEditar(content: any, cita: Cita) {
     this.citaSeleccionado = { ...cita };     
     this.modalService.open(content, { });
   }
 
   updateCita() {
     let datosActualizados = { ...this.citaSeleccionado };
 
     this.citaService.updateCita(this.citaSeleccionado.idCita, datosActualizados).subscribe(
       (response) => {
         Swal.fire('Éxito', 
           'Cita actualizada correctamente', 
           'success');
         this.loadDataIntoTable(); // Recargar la tabla
         this.modalService.dismissAll(); 
       },
       (error) => {
         Swal.fire('Error', 
           'No se pudo actualizar la cita', 
           'error');
       }
     );
   }
 
   deleteCita(idCita: number) {
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
         this.citaService.deleteCita(idCita).subscribe(
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
 
   onPaginaSeleccionada(pagina: number) {
     this.paginaActual = pagina;
     this.actualizarCitasPaginadas();
   }
   
   actualizarCitasPaginadas() {
     const inicio = (this.paginaActual - 1) * this.citasPorPagina;
     const fin = inicio + this.citasPorPagina;
     this.citas = this.citasPaginadas.slice(inicio, fin);
   }
}
