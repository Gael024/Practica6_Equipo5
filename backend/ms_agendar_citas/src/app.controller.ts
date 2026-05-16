import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/registro')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Endpoint para registrar una cita
  @Post()
  registrarCita() {
    return this.appService.registrarCita();
  }

  // Para obtener todas las citas
  @Get()
  obtenerCitas() {
    return this.appService.obtenerCitas();
  }
}
