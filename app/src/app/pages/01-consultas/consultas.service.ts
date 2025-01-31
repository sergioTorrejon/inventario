import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Globals } from 'src/app/app.globals';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
    private url: string = '';

    constructor (private http: HttpClient) {
        this.url = Globals.api;
    }

    /** DATA DOCUMENTOS PAGINADOS */
      getDocs(dto: any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
      {
        return this.http.get<any[]>(`${this.url}/${dto.model}?` +
        (page === 0? ``: `&page=${page}`) +
        (limit === 0? ``: `&limit=${limit}`) +
        (sort === ''? ``: `&sort=${sort}`) +
        (order === ''? ``: `&order=${order}`) +
        (dto.modulo === ''? ``: `&modulo=${dto.modulo}`) +
        (dto.entidad === ''? ``: `&rc_inten=${dto.entidad}`) +
        (dto.year === 0? ``: `&rc_year=${dto.year}`) +
        (dto.tipo === ''? ``: `&rc_tipo=${dto.tipo}`) +
        (dto.numero === ''? ``: `&rc_numero=${dto.numero}`) +
        (dto.titulo === ''? ``: `&rc_titulo=${dto.titulo}`) +
        (dto.subtipo === ''? ``: `&rc_subtipo=${dto.subtipo}`) +
        (dto.mercado === ''? ``: `&rc_mercado=${dto.mercado}`) +
        (dto.del === ''? ``: `&del=${this.formatDate(dto.del)}`) +
        (dto.al === ''? ``: `&al=${this.formatDate(dto.al)}`)
        ).pipe();
      }

    /** LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
      getOptions(): Observable<any> {
        return this.http.get(`${this.url}/catalogos/options`).pipe();
      }

      getUsuarios(): Observable<any> {
        return this.http.get(`${this.url}/usuarios/usuario`).pipe();
      }


    //#region DOWNLOAD
      /** DOWNLOAD GET FILE */
      getFile(model: string, id: number):  any {
        const returl = `${this.url}/${model}/download/${id}`;
        return this.http.get(returl, { responseType: "blob" } );
      }

      /**REPORTE EN CSV */
      getCsv(dto: any,sort: string = '',order: string = ''):  Observable<any>
      {
        const returl = `${this.url}/${dto.model}/downloadcsv?` +
        (sort === ''? ``: `&sort=${sort}`) +
        (order === ''? ``: `&order=${order}`) +
        (dto.modulo === ''? ``: `&modulo=${dto.modulo}`) +
        (dto.entidad === ''? ``: `&rc_inten=${dto.entidad}`) +
        (dto.year === 0? ``: `&rc_year=${dto.year}`) +
        (dto.tipo === ''? ``: `&rc_tipo=${dto.tipo}`) +
        (dto.numero === ''? ``: `&rc_numero=${dto.numero}`) +
        (dto.titulo === ''? ``: `&rc_titulo=${dto.titulo}`) +
        (dto.subtipo === ''? ``: `&rc_subtipo=${dto.subtipo}`) +
        (dto.mercado === ''? ``: `&rc_mercado=${dto.mercado}`) +
        (dto.del === ''? ``: `&del=${this.formatDate(dto.del)}`) +
        (dto.al === ''? ``: `&al=${this.formatDate(dto.al)}`)
        return this.http.get(returl, { responseType: "blob" } )
      }

      /** REPORTE EN PDF */
      getPdf(dto: any,sort: string = '',order: string = ''):  Observable<any>
      {
        const returl = `${this.url}/${dto.model}/downloadpdf?` +
        (sort === ''? ``: `&sort=${sort}`) +
        (order === ''? ``: `&order=${order}`) +
        (dto.modulo === ''? ``: `&modulo=${dto.modulo}`) +
        (dto.entidad === ''? ``: `&rc_inten=${dto.entidad}`) +
        (dto.year === 0? ``: `&rc_year=${dto.year}`) +
        (dto.tipo === ''? ``: `&rc_tipo=${dto.tipo}`) +
        (dto.numero === ''? ``: `&rc_numero=${dto.numero}`) +
        (dto.titulo === ''? ``: `&rc_titulo=${dto.titulo}`) +
        (dto.subtipo === ''? ``: `&rc_subtipo=${dto.subtipo}`) +
        (dto.mercado === ''? ``: `&rc_mercado=${dto.mercado}`) +
        (dto.del === ''? ``: `&del=${this.formatDate(dto.del)}`) +
        (dto.al === ''? ``: `&al=${this.formatDate(dto.al)}`)
        return this.http.get(returl, { responseType: "blob" } )
      }

      /** TRAE NOTIFICACIONES POR CODIGO DE DOCUMENTOS */
      getNotificaciones(model: string, id: number = 0):  Observable<any> {
        return this.http.get(`${this.url}/${model}/getNotificaciones/${id}`).pipe();
      }

      /** TRAE NOTIFICACIONES POR CODIGO DE DOCUMENTOS */
      getSeguimientos(id: number = 0):  Observable<any> {
        return this.http.get(`${this.url}/seguimiento/${id}`).pipe();
      }

      //#endregion
      formatDate(date:Date) {
        const dateFormat = new Date(date);
          return dateFormat.getFullYear() + '-' + (dateFormat.getMonth()+1) + '-' + dateFormat.getDate();
          //return dateFormat
          //return 'sergio'+
      }

      /** DOWNLOAD GET FILE */
      getManual():  any {
        const returl = `${this.url}/cartas_resoluciones/manual`;
        return this.http.get(returl, { responseType: "blob" } );
      }

  }
