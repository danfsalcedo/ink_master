import { Cliente } from './cliente.model';
import { Empleado } from './empleado.model';

export interface Cita{
    idCita: number;
    fechaCita: string;
    horaCita: string;
    idCliente: number;
    idEmpleado: number;
    cliente?: Cliente;
    empleado?: Empleado;
}