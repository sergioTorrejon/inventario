import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Notificados } from './entities';
import { NotificadosController } from './productos.controller';
import { NotificadosService } from './productos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notificados])],
  controllers: [NotificadosController],
  providers: [NotificadosService],
})
export class NotificadosModule {}
