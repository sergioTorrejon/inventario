import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/app.globals';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private url: string = '';

    constructor (private http: HttpClient) {
        this.url = Globals.api;
    }

    /** CARTAS RESOLUCIONES */
    /** DATA DOCUMENTOS PAGINADOS */
    getDocs(dto: any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/${dto.model}/admin/data?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`) +
      (dto.modulo === ''? ``: `&modulo=${dto.modulo}`) +
      (dto.etapa === ''? ``: `&etapa=${dto.etapa}`) +
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

    /** DOWNLOAD PDF */
      getData(model: string):  Observable<any> {
      return this.http.get(`${this.url}/${model}`).pipe();
      }

    /**TRAE DOCUMENTOS PAGINADOS */
      getNotificadosFilter(model: string,descripcion: string = ''):  Observable<any>
      {
        return this.http.get<any[]>(`${this.url}/${model}` +
        (descripcion === ''? ``: `?`) +
        (descripcion === ''? ``: `descripcion=${descripcion}`)
        ).pipe();
      }

    /** NOTIFICACIONES */
    /** TRAE NOTIFICACIONES POR CODIGO DE DOCUMENTOS */
      getNotificaciones(model: string, id: number = 0):  Observable<any> {
        return this.http.get(`${this.url}/${model}/getNotificaciones/${id}`).pipe();
      }

    /** CATALOGOS */
    /** TRAE LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
      getOptions(): Observable<any> {
        return this.http.get(`${this.url}/catalogos/options`).pipe();
      }

    //#region CRUD
      /** INSERT CON FORMDATA */
      create(model: string, data: any, file: FormData): Observable<any> {
        return this.http.post(`${this.url}/${model}`, file).pipe();
      }

      /** INSERT SIMPLE */
      createSimple(model: string, data: any): Observable<any> {
        return this.http.post(`${this.url}/${model}`,data).pipe();
      }

      /** MODIFICACION CON FORMDATA */
      update(model: string, id: number, data: any, file: FormData): Observable<any> {
        return this.http.put(`${this.url}/${model}/${id}`, file).pipe();
      }

      /** ELIMINACION LOGICA */
      delete(model: string, id: number): Observable<any> {
        return this.http.delete(`${this.url}/${model}/${id}`);
      }
    //#endregion

    //#region DOWNLOAD
      /** DOWNLOAD GET FILE */
      getFile(model: string, id: number):  any {
        const returl = `${this.url}/${model}/download/${id}`;
        return this.http.get(returl, { responseType: "blob" } );
      }
      /**REPORTE EN CSV */
      getCsv(dto: any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
      {
        const returl = `${this.url}/${dto.model}/downloadcsv?` +
        (page === 0? ``: `&page=${page}`) +
        (limit === 0? ``: `&limit=${limit}`) +
        (sort === ''? ``: `&sort=${sort}`) +
        (order === ''? ``: `&order=${order}`) +
        (dto.modulo === ''? ``: `&modulo=${dto.modulo}`) +
        (dto.etapa === ''? ``: `&etapa=${dto.etapa}`) +
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
      getPdf(dto: any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
      {
        const returl = `${this.url}/${dto.model}/downloadpdf?` +
        (page === 0? ``: `&page=${page}`) +
        (limit === 0? ``: `&limit=${limit}`) +
        (sort === ''? ``: `&sort=${sort}`) +
        (order === ''? ``: `&order=${order}`) +
        (dto.modulo === ''? ``: `&modulo=${dto.modulo}`) +
        (dto.etapa === ''? ``: `&etapa=${dto.etapa}`) +
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
    getSeguimientos(id: number = 0):  Observable<any> {
      return this.http.get(`${this.url}/seguimiento/${id}`).pipe();
    }

    //#endregion
    formatDate(date:Date) {
      const dateFormat = new Date(date);
        return dateFormat.getFullYear() + '-' + (dateFormat.getMonth()+1) + '-' + dateFormat.getDate();
    }


      /** MODIFICACION CON FORMDATA */
      refuse(model: string, id: number, data: any): Observable<any> {
        return this.http.put(`${this.url}/${model}/refuse/${id}`, data).pipe();
      }

      /** MODIFICACION CON FORMDATA */
      checker(model: string, id: number, data: any): Observable<any> {
        return this.http.put(`${this.url}/${model}/checker/${id}`, data).pipe();
      }

}
