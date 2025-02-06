import {
  IsString,
} from 'class-validator';

export class CreateProductosDto {
  @IsString()
  tipo_producto: string;

  @IsString()
  medida: string;

  @IsString()
  marca: string;

  @IsString()
  descripcion: string;
}
