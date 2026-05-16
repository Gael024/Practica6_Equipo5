import { IsEnum } from "class-validator";
import { EstadoCita } from "../entities/cita.entity";

export class ActualizarEstadoCitaDto {
    @IsEnum(EstadoCita, {
        message: 'El estado debe ser: pendiente, confirmada, cancelada o completada',
    })
    estado: EstadoCita;
}