import { IsEnum } from 'class-validator';
import { EstadoCita } from '../entities/cita.entity';

export class ActualizarEstadoCitaDto {

  @IsEnum(EstadoCita)
  estado: EstadoCita;

}