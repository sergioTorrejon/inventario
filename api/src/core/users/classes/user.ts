import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    username: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    role: string[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    company: string;
}