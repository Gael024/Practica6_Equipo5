import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactoModule } from './contacto/contacto.module';

import { MensajeContacto } from './contacto/entities/mensaje-contacto.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || process.env.DB_NAME ||'contactos_db',
      entities: [MensajeContacto],
      synchronize: true,
    }),

    ContactoModule,],
})
export class AppModule {}
