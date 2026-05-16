import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cita } from './entities/cita.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'citas_db',
      entities: [Cita],
      synchronize: true, // En producción cambiar a false y usar migraciones
    }),
    TypeOrmModule.forFeature([Cita]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
