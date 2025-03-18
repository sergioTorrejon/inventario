import {
  IsString,
} from 'class-validator';

export class CreateDto {
  @IsString()
  categoria: string;

  @IsString()
  descripcion: string;

  @IsString()
  marca: string;

  @IsString()
  modelo: string;

  @IsString()
  observaciones: string;

}


export class UpdateDto {
  @IsString()
  categoria: string;

  @IsString()
  descripcion: string;

  @IsString()
  marca: string;

  @IsString()
  modelo: string;

  @IsString()
  observaciones: string;

}
