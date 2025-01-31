    import { Injectable } from '@angular/core';
    import {
        HttpErrorResponse,
        HttpResponse,
        HttpRequest,
        HttpHandler,
        HttpEvent,
        HttpInterceptor
    } from '@angular/common/http';
    import { Observable, of } from 'rxjs';
    import { map, filter, scan, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/components/spinner.service';

    @Injectable()
    export class LoaderInterceptor implements HttpInterceptor {

        constructor(private spinnerService: SpinnerService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*
        // Añade una cabecera de autorizacion con el JWT si esta disponible
        let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        if (usuario && usuario.access_token) {
            // verificar el token refresh, aun en desarrollo


            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.access_token}`
                }
            });
        }

        return next.handle(request);*/
        //console.log('inside interceptor'); //20210729
        this.spinnerService.requestStarted();
        return this.handler(next, request);
    }
    //https://www.youtube.com/watch?v=H9KLIbisVJ8
    handler(next:any, request:any){
        //console.log('request:');//20210729
        //console.log(request);//20210729
        return next.handle(request)
        .pipe(
            tap(
                (event:any)=>{
                    //console.log('event');//20210729
                    //console.log(event);//20210729
                    if(event instanceof HttpResponse){
                        this.spinnerService.requestEnded();
                    }
                },
                (error: HttpErrorResponse) => {
                    this.spinnerService.resetSpinner();
                    throw error;
                }
            )
        )
    }

/*
        private requests: HttpRequest<any>[] = [];

        constructor(private spinnerService: SpinnerService) { }

        removeRequest(req: HttpRequest<any>) {
            const i = this.requests.indexOf(req);
            if (i >= 0) {
                this.requests.splice(i, 1);
            }
            this.spinnerService.isLoading.next(this.requests.length > 0);
        }*/

/*
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            this.requests.push(req);
            console.log("No of requests--->" + this.requests.length);
            this.spinnerService.isLoading.next(true);

            return Observable.create(observer => {
                const subscription = next.handle(req)
                    .subscribe(
                        event => {
                            if (event instanceof HttpResponse) {
                                this.removeRequest(req);
                                observer.next(event);
                            }
                        },
                        err => {
                            // alert('error returned');
                            this.removeRequest(req);
                            observer.error(err);
                        },
                        () => {
                            this.removeRequest(req);
                            observer.complete();
                        });
                // remove request from queue when cancelled
                return () => {
                    this.removeRequest(req);
                    subscription.unsubscribe();
                };
            });
        }*/
    }
