/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from './entities';
import { CreateDto, UpdateDto } from './dtos';


@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly repository: Repository<Productos>,
  ) {}

  //#region GET ALL
  async getDataFilter( descripcion: string ) {

    const script =  
    `
    select categoria,descripcion,marca,modelo,observaciones,estado
    from productos
    `

    const data = await this.repository.query(script)

    console.log('prueba',data.length)
    return {data:{data, count:data.length}}
  }


  //#region GET BY ID
  async getById(id: number) {
    const data = await this.repository.findOne(id);
    if (!data)
      throw new NotFoundException(process.env.MESSAGE_FIND_ONE_NOT_FOUND);
    return data;
  }
  
  //#region CREATE ONE
  async createOne(dto: CreateDto) {
    const post = this.repository.create(dto);
    console.log(post)
    return await this.repository.save(post);
  }


  //#region UPDATE ONE
  async editOne(id: number, dto: UpdateDto) {
    const data = await this.getById(id);
    const edit = Object.assign(data, dto);
    const save = await this.repository.save(dto);
    return save
  }
    

  //#region DELETE ONE
  async deleteOne(id: number, user: string) {
    const dto = await this.getById(id);
    dto.estado=false
    dto.usuario_modificacion = user;
    const data = await this.repository.save(dto);
    return data 
  }



}
