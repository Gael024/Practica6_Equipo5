import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Cita, EstadoCita } from './entities/cita.entity';
import { ActualizarEstadoCitaDto } from './dto/actualizar-estado-cita.dto';
import { FiltrarCitasDto } from './dto/filtrar-citas.dto';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citasRepository: Repository<Cita>,
  ) {}

  async obtenerCitas(filtros: FiltrarCitasDto): Promise<Cita[]> {
    const where: any = {};

    if (filtros.email) {
      where.email = filtros.email;
    }

    if (filtros.especialidad) {
      where.especialidad = filtros.especialidad;
    }

    if (filtros.desde && filtros.hasta) {
      where.fecha = Between(filtros.desde, filtros.hasta);
    }

    return this.citasRepository.find({
      where,
      order: {
        fecha: 'ASC',
        hora: 'ASC',
      },
    });
  }

  async obtenerCitaPorId(id: number): Promise<Cita> {
    const cita = await this.citasRepository.findOne({
      where: { id },
    });

    if (!cita) {
      throw new NotFoundException(`No se encontró la cita con ID ${id}`);
    }

    return cita;
  }

  async actualizarEstado(
    id: number,
    actualizarEstadoDto: ActualizarEstadoCitaDto,
  ): Promise<Cita> {
    const cita = await this.obtenerCitaPorId(id);

    cita.estado = actualizarEstadoDto.estado;

    return this.citasRepository.save(cita);
  }

  async cancelarCita(id: number): Promise<Cita> {
    const cita = await this.obtenerCitaPorId(id);

    cita.estado = EstadoCita.CANCELADA;

    return this.citasRepository.save(cita);
  }

  async eliminarCita(id: number): Promise<{ mensaje: string }> {
    const cita = await this.obtenerCitaPorId(id);

    await this.citasRepository.remove(cita);

    return {
      mensaje: `La cita con ID ${id} fue eliminada correctamente`,
    };
  }
}