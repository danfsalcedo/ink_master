import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';

import { Cita } from '../../modelos/cita.model';
import { CitaService } from '../../services/cita.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendario-citas',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendario-citas.component.html',
  styleUrl: './calendario-citas.component.css'
})
export class CalendarioCitasComponent implements OnInit {

  citas: Cita[] = [];
  citasDelDia: Cita[] = [];
  calendarOptions: CalendarOptions = {};
  isBrowser: boolean;

  constructor(
    private citaService: CitaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        dateClick: this.handleDateClick.bind(this),
        events: []
      };

      this.citaService.getCitas().subscribe(citas => {
        this.citas = citas;
        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.getEventosCitas()
        };
      });
    }
  }

  getEventosCitas() {
    return this.citas.map(cita => ({
      title: `Cliente: ${cita.idCliente}`,
      date: cita.fechaCita
    }));
  }

  handleDateClick(arg: any) {
    const fecha = arg.dateStr;
    this.citasDelDia = this.citas.filter(c => c.fechaCita === fecha);
  }
}