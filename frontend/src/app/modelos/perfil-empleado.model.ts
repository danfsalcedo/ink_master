import { Empleado } from './empleado.model';

export interface PerfilEmpleado {
    idPerfil: number;
    idEmpleado: number;
    fotoEmpleado?: string;
    historiaEmpleado?: string;
    experienciaEmpleado?: string;
    enfoquesEmpleado?: string;
    empleado?: Empleado;
  }