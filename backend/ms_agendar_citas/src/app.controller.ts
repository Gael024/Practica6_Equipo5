import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { Cita } from './entities/cita.entity';

@Controller('citas')
export class AppController {
  constructor(private readonly appService: AppService) { }

  // POST Para registrar una nueva cita
  @Post()
  registrarCita(@Body() createCitaDto: CreateCitaDto): Promise<Cita> {
    return this.appService.registrarCita(createCitaDto);
  }

  // GET Para obtener todas las citas
  @Get()
  obtenerCitas(): Promise<Cita[]> {
    return this.appService.obtenerCitas();
  }

  // GET Para obtener una cita por ID
  @Get(':id')
  obtenerCitaPorId(@Param('id') id: number): Promise<Cita | null> {
    return this.appService.obtenerCitaPorId(id);
  }

}
