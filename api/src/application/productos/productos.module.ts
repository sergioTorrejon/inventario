import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Productos } from './entities';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Productos])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
