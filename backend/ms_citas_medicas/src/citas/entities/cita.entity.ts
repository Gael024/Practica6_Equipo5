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

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'correo' })
  email: string;

  @Column({ name: 'telefono' })
  telefono: string;

  @Column({ name: 'especialidad' })
  especialidad: string;

  @Column({ name: 'fechacita', type: 'date' })
  fecha: string;

  @Column({ name: 'horacita', type: 'time' })
  hora: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: EstadoCita.PENDIENTE,
  })
  estado: EstadoCita;
}