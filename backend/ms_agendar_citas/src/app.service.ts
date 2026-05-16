import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) { }

  // Registrar una nueva cita en la base de datos
  async registrarCita(createCitaDto: CreateCitaDto): Promise<Cita> {
    const nuevaCita = this.citaRepository.create(createCitaDto);
    return this.citaRepository.save(nuevaCita);
  }

  // Obtener todas las citas registradas
  async obtenerCitas(): Promise<Cita[]> {
    return this.citaRepository.find();
  }

  // Obtener una cita por su ID
  async obtenerCitaPorId(id: number): Promise<Cita | null> {
    return this.citaRepository.findOneBy({ id });
  }


}
