import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { CreateMensajeContactoDto } from './dto/create-mensaje-contacto.dto';

@Controller('contacto')
export class ContactoController {
    constructor(private readonly contactoService: ContactoService) {}
    @Post()
    crearMensaje(@Body() dto: CreateMensajeContactoDto) {
        return this.contactoService.create(dto);
    }

    @Get()
    obtenerMensajes() {
        return this.contactoService.findAll();
    }

    @Get('stats')
    obtenerStats() {
        return this.contactoService.count();
    }

    @Get(':id')
    obtenerMensajePorId(@Param('id', ParseIntPipe) id: number) {
        return this.contactoService.findOne(id);
    }

    @Delete(':id')
    eliminarMensaje(@Param('id', ParseIntPipe) id: number) {
        return this.contactoService.delete(id);
    }
}
