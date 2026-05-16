import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('mensajes_contacto')
export class MensajeContacto {
    @PrimaryGeneratedColumn()
id: number;

    @Column({ length: 150 })
    nombre: string;

    @Column({ length: 150 })
    correo: string;

    @Column({ length: 20, nullable: true })
    telefono: string;

    @Column({ length: 200, nullable: true })
    asunto: string;

    @Column({ type: 'text' })
    mensaje: string;

    @CreateDateColumn({ name: 'fecha_envio' })
    fechaEnvio: Date;
}