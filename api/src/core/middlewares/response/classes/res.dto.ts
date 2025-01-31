import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class ResDto {
    
    @IsBoolean()
    success: boolean;

    @IsString()
    message: string;
    
    @IsOptional()
    @IsString()
    error?: string;

    @IsArray()
    data: string[];
    
}