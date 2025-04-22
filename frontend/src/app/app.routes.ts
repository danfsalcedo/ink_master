import { Routes } from '@angular/router';
import { InicioComponent } from './cliente/inicio/inicio.component';
import { RegistroCitasComponent } from './cliente/registro-citas/registro-citas.component';
import { RegistroClienteComponent } from './cliente/registro-cliente/registro-cliente.component';
import { TatuadoresComponent } from './cliente/tatuadores/tatuadores.component';
import { CitasRegistradasComponent } from './administrador/citas-registradas/citas-registradas.component';
import { ClientesRegistradosComponent } from './administrador/clientes-registrados/clientes-registrados.component';
import { EmpleadosRegistradosComponent } from './administrador/empleados-registrados/empleados-registrados.component';
import { LoginComponent } from './componentes/login/login.component';
import { TatuadoresdetComponent } from './cliente/tatuadoresdet/tatuadoresdet.component';
import { AuthGuard } from './auth.guard';
import { CalendarioCitasComponent } from './empleado/calendario-citas/calendario-citas.component';
import { AccesoDenegadoComponent } from './componentes/acceso-denegado/acceso-denegado.component';
import { PerfilEmpleadoComponent } from './empleado/perfil-empleado/perfil-empleado.component';

export const routes: Routes = [
  // Rutas públicas
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'registrate', component: RegistroClienteComponent },
  { path: 'tatuadores', component: TatuadoresComponent },
  { path: 'info', component: TatuadoresdetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'acceso-denegado', component: AccesoDenegadoComponent },

  // Rutas de cliente (requieren autenticación y rol cliente)
  { 
    path: 'agenda', 
    component: RegistroCitasComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'cliente' }
  },

  // Rutas de empleado
  { 
    path: 'calendario', 
    component: CalendarioCitasComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'empleado' }
  },
  { 
    path: 'perfil', 
    component: PerfilEmpleadoComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'empleado' }
  },

  // Rutas de administrador
  { 
    path: 'citas', 
    component: CitasRegistradasComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'administrador' }
  },
  { 
    path: 'clientes', 
    component: ClientesRegistradosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'administrador' }
  },
  { 
    path: 'empleados', 
    component: EmpleadosRegistradosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'administrador' }
  }
];