import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

/**
 * La clase LoginComponent
 *
 * @author J. Alvaro Mamani <jmamani@aps.gob.bo>
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
    ) {
    }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    //this.router.navigate(['/dashboard']);
    this.authenticationService.login(this.form.controls['uname'].value, this.form.controls['password'].value)
        .pipe(first())
        .subscribe(
          data => {
            let role =  this.authenticationService.currentUser.role
            let role_principal=''
            if (typeof role === 'string') {
              role_principal = role
              //console.log('La variable es un texto (string).');
            } else if (Array.isArray(role)) {
              role_principal = role[0]
              //console.log('La variable es un array.',role[0]);
            } else {
              //console.log('La variable no es ni un texto ni un array.');
            }
            console.log(this.authenticationService, 'AUTHo')
            if(role_principal=='administrador'){
              this.router.navigate(['/administrador']);
            }
            else if(role_principal=='supervisor'){
              this.router.navigate(['/verificacion']);
            }
            else if(role_principal==='operador') {
              this.router.navigate(['/registros']);
            }
            else {
              this.router.navigate(['/consultas']);
            }
          },
        )
  }
}
