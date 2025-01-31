import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase que contiene los metodos para gestionar el login de usuario.
 *
 * @author J. Alvaro Mamani <jmamani@aps.gob.bo>
 */
export class AdminGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private authorizationService: AuthorizationService/*,
        private notifier: NotifierService*/) {}

    //canActivate() {
    //    if (this.authenticationService.isLoggedIn()) {
    //        // console.log('en teoria esta logueado');
    //        console.log("Roles",this.authenticationService.GetRoles);
    //        return true;
    //    }
    //    console.log('error', 'Ingrese su nombre de usuario y password');
    //    this.router.navigate(['authentication/login']);
    //    return false;
    //}


 canActivate() {
  if (this.authenticationService.isLoggedIn()) {
      // console.log('en teoria esta logueado');
      console.log("Roles asignados");
      let roles=this.authenticationService.GetRoles();
      console.log('roles',roles);
      if(roles.includes('administrador')){

        console.log('administrador');
        return true;
      }else{
        this.router.navigate(['authentication/login']);
          console.log('No incluye rol juridia');
          return false;
      }
      //return true;
  }

  console.log('error', 'Ingrese su nombre de usuario y password');
  this.router.navigate(['authentication/login']);
  return false;
}


    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const allowedRoles = next.data.allowedRoles;
        const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);

        if (!isAuthorized) {
            //this.notifier.notify('error', 'No tiene permisos en la anterior página');
            console.log('error', 'No tiene permisos en la anterior página');
            this.router.navigate(['authentication/login']);
        }

        return isAuthorized;
    }
}
