/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from './entities';
import { CreateProductosDto } from './dtos';


@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly productosRepository: Repository<Productos>,
  ) {}

  //------------CRUD GET ALL WITH PAGINATE------------//
  async getDataFilter( descripcion: string ) {
    const data = await this.productosRepository
    .createQueryBuilder("notificados")
    .select("notificados.descripcion", "descripcion")
    .where("notificados.estado = :estado", { estado: true })
    .where("unaccent(notificados.descripcion) ilike unaccent('%"+ descripcion +"%')")
    .getRawMany();
    return data
  }
  
  async createOne(dto: CreateProductosDto) {
    const post = this.productosRepository.create(dto);
    console.log(post)
    return await this.productosRepository.save(post);
  }

}
