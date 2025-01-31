import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router,  ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

/**
 * La clase ErrorInterceptor
 *
 * @author J. Alvaro Mamani <jmamani@aps.gob.bo>
*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        /*private notifier: NotifierService,*/
        private authenticationService: AuthenticationService,
        private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400) {
                this.router.navigate(['authentication/login']);
                return throwError(err.error.message);
            }
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
            }
            if (err.status === 500) {
                // auto logout if 401 response returned from api
                //this.authenticationService.logout();
                console.log('error', err);
            }
            if (err.status === 404) {
              // auto logout if 401 response returned from api
              //this.authenticationService.logout();
              console.log('error', err);
          }
            const error = err.message ||  err.statusText;
            console.log('error', 'Error: ' + error + '(' + err.status + '). Se sugiere actualizar la página');

            this.router.navigate(['authentication/login']);

            return throwError(error);
        }))
    }
}
