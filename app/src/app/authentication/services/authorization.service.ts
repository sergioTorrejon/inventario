import { Injectable } from '@angular/core';
import {JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
/**
 * Clase que contiene los metodos para gestionar la autorización del usuario.
 * 
 * @author J. Alvaro Mamani <jmamani@aps.gob.bo>
*/
export class AuthorizationService {
    /**
     * Constructor
     * @param jwtHelperService JwtHelperService: Se injecta un objeto de la clase JwtHelperService
     */
    constructor(private jwtHelperService: JwtHelperService) { }

    /**
     * Verifica si el usuario (almacenado en el localStorage) tiene al menos unos de los roles del array allowedRoles
     * 
     * @param allowedRoles array: roles permitidos
     */
    public isAuthorized(allowedRoles: string[]): boolean;

    public isAuthorized(allowedRoles: string): boolean;

    public isAuthorized(allowedRoles: string | string[]): boolean {
      // actual implementation here
      if (allowedRoles === null ){
        return true;
      }

      if (typeof allowedRoles === "string") {
        allowedRoles = [allowedRoles];
      }

       // Verifica si la lista de roles permitidos está vacío, de ser así se autoriza el acceso.
      if (allowedRoles == null || allowedRoles.length === 0) {
        return true;
      }

      const usuario = JSON.parse(localStorage.getItem("usuario")|| '{}');
      if (!(usuario && usuario.access_token)) {
        console.log('AuthorizationService: No existe el token');
        return false;
      }
    
      // Decodifica el token para obtener el detalle de sus payloads
      const decodeToken = this.jwtHelperService.decodeToken(usuario.access_token);
      // Verifica si el token fue decodificado existosamente, si no retorna false
      if (!decodeToken) {
        console.log('AuthorizationService: Token inválido');
        return false;
      }

      //console.log('decodeToken: ');
      //console.log(decodeToken);
      //console.log(allowedRoles.indexOf(decodeToken.role) >= 0);
      
      // Verifica si el atributo (payload) role del token es un array.
      if(!Array.isArray(decodeToken.role) ){
        //console.log('no es array');
        // Verifica si el rol del usuario esta en la lista de los roles permitidos, retorna true si está permitido y retorna flase si no está permitido
        return allowedRoles.indexOf(decodeToken.role) >= 0;
      }
      else{
        //console.log('ES array');
        let check = allowedRoles.some(r=> decodeToken.role.includes(r));
        //let op2 = allowedRoles.some(r=> decodeToken.role.indexOf(r) >= 0);
        return check;
      }
    }
}