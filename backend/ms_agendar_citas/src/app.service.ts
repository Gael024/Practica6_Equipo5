import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  registrarCita() {
    return 'Cita registrada';
  }

  obtenerCitas() {
    return 'Citas obtenidas';
  }
}
