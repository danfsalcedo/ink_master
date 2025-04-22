import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output,} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './paginador.component.html',
  styleUrl: './paginador.component.css'
})
export class PaginadorComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPorPagina: number = 5;
  @Input() paginaActual: number = 1;

  @Output() paginaSeleccionada = new EventEmitter<number>();

  get totalPaginas(): number {
    return Math.ceil(this.totalItems / this.itemsPorPagina);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaSeleccionada.emit(pagina);
    }
  }

  irPrimeraPagina() {
    this.cambiarPagina(1);
  }

  irUltimaPagina() {
    this.cambiarPagina(this.totalPaginas);
  }

  paginaAnterior() {
    this.cambiarPagina(this.paginaActual - 1);
  }

  paginaSiguiente() {
    this.cambiarPagina(this.paginaActual + 1);
  }

  getPaginasRango(): number[] {
    const rango: number[] = [];
    const total = this.totalPaginas;
    let inicio = Math.max(1, this.paginaActual - 2);
    let fin = Math.min(total, this.paginaActual + 2);

    if (fin - inicio < 4) {
      if (inicio === 1) fin = Math.min(total, inicio + 4);
      else if (fin === total) inicio = Math.max(1, fin - 4);
    }

    for (let i = inicio; i <= fin; i++) {
      rango.push(i);
    }

    return rango;
  }
}
