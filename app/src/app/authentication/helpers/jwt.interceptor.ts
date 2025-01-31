import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

/**
 * La clase JwtInterceptor configura el intereptor para manejar las respuestas.
 *
 * @author J. Alvaro Mamani <jmamani@aps.gob.bo>
*/
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService){}

    /**
     *
     * El método de intercepción devuelve un observable, lo que significa que se puede
     * capturar los canales de éxito y error para una respuesta y operar en ellos como sea requerido.
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor request', request); // 20210729
        // Añade una cabecera de autorizacion con el JWT si esta disponible
        let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        console.log('usuariooo',usuario)
        if (usuario && usuario.access_token) {
            // verificar el token refresh, aun en desarrollo
            /*
            if(!this.authenticationService.isLoggedIn()){
                // no esta logueado o se vencio el tiempó del token
                console.log('calling to this.authenticationService.refresh(' + usuario.refresh_token + ') because the token has expired!');
                var algo = this.authenticationService.refresh(usuario.refresh_token);
                console.log(algo);
                usuario = JSON.parse(localStorage.getItem('usuario'));
            }
            */
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}
