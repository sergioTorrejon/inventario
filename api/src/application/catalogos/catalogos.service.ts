import * as params from 'src/common/helpers/params';
import { Repository } from 'typeorm';

/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsuariosService } from '../usuarios/usuarios.service';
import { Catalogos } from './entities/catalogos.entity';

@Injectable()
export class CatalogosService {
  constructor(
    @InjectRepository(Catalogos)
    private readonly CatalogosRepository: Repository<Catalogos>,
    private readonly ServiceUsuarios: UsuariosService,
  ) {}
  data:any={};
  async getOptions() {
    this.data.ciudad = await this.getByKey('CIU');
    this.data.direccion = await this.getByKey('DIR');
    this.data.documentos = await this.getByKey('DOC');
    this.data.institucion = await this.getByKey('INT');
    this.data.mercado = await this.getByKey('MER');
    this.data.tipo = await this.getByKey('TIP');
    this.data.tipo_resolucion = await this.getByKey('TP');
    this.data.categoria_documentos = await this.getByKey('CD');
    this.data.years=params.listYears();
    this.data.publicar=params.publicar;
    this.data.usuarios= await this.ServiceUsuarios.usuariosOptions();
    return this.data
  }
  
  async getByKey(descrip: string) {
    const data = await this.CatalogosRepository
    .find(
      { 
        select: ["cod_ele"  , "descrip"], 
        where: [ {cod_tab: descrip} ]
      }
    )
    return data;
  }

}
