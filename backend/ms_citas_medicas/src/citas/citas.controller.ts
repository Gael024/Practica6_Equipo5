import {Controller, Delete, Get, Param, ParseIntPipe, Patch, Query, Body} from '@nestjs/common';
import { CitasService } from './citas.service';
import { ActualizarEstadoCitaDto } from './dto/actualizar-estado-cita.dto';
import { FiltrarCitasDto } from './dto/filtrar-citas.dto';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Get()
  obtenerCitas(@Query() filtros: FiltrarCitasDto) {
    return this.citasService.obtenerCitas(filtros);
  }

  @Get(':id')
  obtenerCitaPorId(@Param('id', ParseIntPipe) id: number) {
    return this.citasService.obtenerCitaPorId(id);
  }

  @Patch(':id/estado')
  actualizarEstado(
    @Param('id') id: string,
    @Body() dto: ActualizarEstadoCitaDto,
  ) {
    return this.citasService.actualizarEstado(+id, dto);
  }

  @Patch(':id/cancelar')
  cancelarCita(@Param('id', ParseIntPipe) id: number) {
    return this.citasService.cancelarCita(id);
  }

  @Delete(':id')
  eliminarCita(@Param('id', ParseIntPipe) id: number) {
    return this.citasService.eliminarCita(id);
  }
}