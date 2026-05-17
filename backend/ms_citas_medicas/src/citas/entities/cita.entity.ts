import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EstadoCita {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  CANCELADA = 'cancelada',
  COMPLETADA = 'completada',
}

@Entity('citas')
export class Cita {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  especialidad: string;

  @Column({ type: 'date' })
  fechaCita: string;

  @Column({ type: 'time' })
  horaCita: string;

  @Column({
    default: 'pendiente'
  })
  estado: string;

}