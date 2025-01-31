/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import * as moment from "moment";
import {Globals} from '../../app.globals';
import {JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
/**
 * Clase que contiene los metodos para gestionar el login de usuario.
 *
 * @author J. Alvaro Mamani <jmamani@aps.gob.bo>
*/
export class AuthenticationService {
  private url: string = '';
    public currentUser: any;
    constructor(
        private http: HttpClient,
        private jwtHelperService: JwtHelperService,
        private snackBar: MatSnackBar
    ) {
        this.url = Globals.api;
        const usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
        if(usuario && usuario.access_token){
            this.currentUser = this.jwtHelperService.decodeToken(usuario.access_token);
        }
    }
    /**
     * Invoca al api de IdentityServer para obtener el token.
     *
     * @param username string: Nombre del usuario (Ej: jperez)
     * @param password string: Password del usuario
     */
    login(username: string, password: string) {
        /*const body = new HttpParams()
            .set('client_id', Globals.token.app)
            .set('username', username)
            .set('password', password);*/
        var params = {
                app: Globals.token.app,
                usuario: username,
                password: password
        }

        //var params = {
        //  email: username,
        //  password: password
        //}

        return this.http.post<any>(
            Globals.token.api,
            params,
            {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json'
                })
            })
            .pipe(map(user => {
                // Si existe un JWT token en la respuesta, el login fue exitoso
                //console.log('user');
                //console.log(user);

                if (user && user.access_token) {
                    //const expirationDate = jwtHelperService.getTokenExpirationDate(user);
                    //const isExpired = jwtHelperService.isTokenExpired(user);

                    // Se almacena el detalle del usuario en el localStorage
                    localStorage.setItem('usuario', JSON.stringify(user));

                    const usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
                    //const regUsuario= this.regUsuario();
                    console.log('prueba',usuario)
                    if(usuario && usuario.access_token){
                        this.currentUser = this.jwtHelperService.decodeToken(usuario.access_token);
                        //console.log('=================this.currentUser==================');
                        //console.log(this.currentUser.entidad);
                    }
                }

                return user;
            }));
    }

        /**
     * Invoca al api de IdentityServer para obtener el token.
     *
     * @param username string: Nombre del usuario (Ej: jperez)
     * @param password string: Password del usuario
     * @param newPassword string: Password del usuario
     */
         reset(username: string, password: string, newPassword: string) {
          /*const body = new HttpParams()
              .set('client_id', Globals.token.app)
              .set('username', username)
              .set('password', password);*/

          var params = {
                  app: Globals.token.app,
                  usuario: username,
                  password: password,
                  newPassword: newPassword
          }

          return this.http.post<any>(
              Globals.token.api,
              params,
              {
                  headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                  })
              })
              /*.pipe(map(user => {
                  // Si existe un JWT token en la respuesta, el login fue exitoso
                  //console.log('user');
                  //console.log(user);

                  if (user && user.access_token) {
                      //const expirationDate = jwtHelperService.getTokenExpirationDate(user);
                      //const isExpired = jwtHelperService.isTokenExpired(user);

                      // Se almacena el detalle del usuario en el localStorage
                      localStorage.setItem('usuario', JSON.stringify(user));

                      const usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
                      if(usuario && usuario.access_token){
                          this.currentUser = this.jwtHelperService.decodeToken(usuario.access_token);
                          //console.log('=================this.currentUser==================');
                          //console.log(this.currentUser.entidad);
                      }
                  }

                  return user;
              }))*/;
      }

    /**
     * En desarrollo
     * Invoca al api para refrescar el token de IdentityServer.
     * El api retornará un nuevo token que se almacenará en el localStorage
     *
     * @param refresh_token string: token de refresqueo
     */
    refresh(refresh_token: string) {
        const bodys = new HttpParams()
            //.set('client_id', Globals.app.clientId)
            //.set('client_secret', Globals.app.clientSecret)
            //.set('grant_type', 'refresh_token')
            .set('usuario', refresh_token)
            .set('app', Globals.token.app)
            .set('refreshToken', refresh_token);

        console.log('Inside refresh');
        console.log(bodys);

        return this.http.post<any>(
            Globals.token.api + '/refresh',
            bodys.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .pipe(
                map(user => {
                    // Si existe un JWT token en la respuesta, el login fue exitoso
                    console.log('user from refresh_token');
                    console.log(user);
                    if (user && user.access_token) {
                        // Se almacena el detalle del usuario en el localStorage
                        localStorage.setItem('usuario', JSON.stringify(user));

                        console.log('isLoggedIn() from refrech_token');
                        //console.log(this.isLoggedIn());
                    }
                    return user;
            }));
    }

    /**
     * Remueve el usuario desde el localStorage.
     */
    logout() {
        localStorage.removeItem('usuario');
    }

    /**
     * Verifica si el usuario está logueado.
     */
    public isLoggedIn() {
        const usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
        if(usuario && usuario.access_token){
            const decodeToken = this.jwtHelperService.decodeToken(usuario.access_token);
            console.log('decodeTokendecodeTokendecodeTokendecodeToken',decodeToken);
            // esta alternativa seria mejor. pero el servidor está retornando un nbf con 30 segundos antes que la hora en el cliente
            //console.log(moment().isBetween(moment.unix(decodeToken.nbf-60), moment.unix(decodeToken.exp)));
            console.log(moment().unix() + ' - ' + moment.unix(decodeToken.exp) + ' : ' + moment().isBefore(moment.unix(decodeToken.exp)));
            //return moment().isBetween(moment.unix(decodeToken.nbf-60), moment.unix(decodeToken.exp));
            return moment().isBefore(moment.unix(decodeToken.exp));
        }
        return false;
    }


    public GetRoles() {
      const usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
      if(usuario && usuario.access_token){
          const decodeToken = this.jwtHelperService.decodeToken(usuario.access_token);
          return  decodeToken.role;
      }
  }


    /**
     * Verifica si el usuario no está logueado.
     */
    isLoggedOut() {
        return !this.isLoggedIn();
    }




/*     async regUsuario() {
      const user = await this.http.get(`${Globals.api}/usuarios/usuario`)
      .pipe(first())
      );
      console.log('usuario',user)
      return
    } */

      /** DOWNLOAD GET FILE */
      getManual():  any {
        const returl = `${this.url}/cartas_resoluciones/manual`;
        return this.http.get(returl, { responseType: "blob" } );
      }

}
