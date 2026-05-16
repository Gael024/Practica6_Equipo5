import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
 
export class CreateMensajeContactoDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(50)
  nombre: string;
 
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @MaxLength(30)
  correo: string;
 
  @IsOptional()
  @IsString()
  @MaxLength(15)
  telefono?: string;
 
  @IsOptional()
  @IsString()
  @MaxLength(200)
  asunto?: string;
 
  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  @IsString()
  mensaje: string;
}
 