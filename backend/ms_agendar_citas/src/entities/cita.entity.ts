import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 150 })
  correo: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 100 })
  especialidad: string;

  @Column({ type: 'date' })
  fechaCita: string;

  @Column({ type: 'time' })
  horaCita: string;
}
