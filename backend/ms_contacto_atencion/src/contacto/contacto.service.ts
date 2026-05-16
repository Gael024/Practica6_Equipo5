import { Injectable, InternalServerErrorException  } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MensajeContacto } from './entities/mensaje-contacto.entity';
import { CreateMensajeContactoDto } from './dto/create-mensaje-contacto.dto';

@Injectable()
export class ContactoService {
    constructor(
        @InjectRepository(MensajeContacto)
        private readonly mensajeRepo: Repository<MensajeContacto>,
    ) {}
 
    // Registrar Mensaje
    async create(dto: CreateMensajeContactoDto): Promise<MensajeContacto> {
        try {
            const mensaje = this.mensajeRepo.create(dto);
            return await this.mensajeRepo.save(mensaje);
        } catch (error) {
            throw new InternalServerErrorException('Error al guardar el mensaje');
        }
    }
 
    //Consultar Mensajes
    async findAll(): Promise<MensajeContacto[]> {
        return this.mensajeRepo.find({
            order: { fechaEnvio: 'DESC' },
        });
    }
 
    // Consultar un mensaje por ID
    async findOne(id: number): Promise<MensajeContacto> {
        const mensaje = await this.mensajeRepo.findOne({ where: { id } });
        if (!mensaje) {
            throw new NotFoundException(`Mensaje con id ${id} no encontrado`);
        }
        return mensaje;
    }
 
    // Conteo total de mensajes recibidos
    async count(): Promise<number> {
        return this.mensajeRepo.count();
    }
    async delete(id: number): Promise<{ message: string }> {
        const result = await this.mensajeRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Mensaje con id ${id} no encontrado`);
        }
        return { message: 'Mensaje eliminado correctamente' };
}
}
