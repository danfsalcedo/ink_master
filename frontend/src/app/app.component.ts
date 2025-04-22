import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from "./componentes/cabecera/cabecera.component";
import { PieComponent } from "./componentes/pie/pie.component";
import { InicioComponent } from "./cliente/inicio/inicio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, PieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ink_master';
}
