import { IsOptional, IsString } from 'class-validator';

export class FiltrarCitasDto {

  @IsOptional()
  @IsString()
  correo?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  desde?: string;

  @IsOptional()
  @IsString()
  hasta?: string;
}