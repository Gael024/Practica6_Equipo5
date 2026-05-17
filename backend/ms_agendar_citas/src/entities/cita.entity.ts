import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
