import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
  Param,
  
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { JwtOperadorRoleGuard } from 'src/core/auth/guards/jwt-operador-role.guard';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(
    private readonly service: ProductosService,
  ) {}

  //#region  GETALL
  //@UseGuards(JwtConsultaRoleGuard)
  @Get()
  async GetData
  (@Query('descripcion') descripcion: string = ''){
    const data = this.service.getDataFilter(descripcion);
    return data;
  }


  //#region  GETONE
  @Get(':id')
  async getDatabyId(@Param('id', ParseIntPipe) id: number) {
    const data = await this.service.getById(id) 
    return data 
  }


  //#region  POSTONE
  @UseGuards(JwtOperadorRoleGuard)
  @Post()
  async createPost(@Req() request,@Body() dto) {
    dto.usuario_creacion = request.user.username;
    const data = await this.service.createOne(dto);
    return { message: 'Notifaco Creado', data };
  }


  //#region  PUTONE


  //#region  DELETE


}
