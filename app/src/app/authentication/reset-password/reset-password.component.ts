import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router,  ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent {
  loginForm: UntypedFormGroup;
  user:any;
  passwordUser:any;
  newPass:any;
  confPass:any;

  error_messages = {
    'uname': [
      { type: 'required', message: 'El nombre de usuario es requerido.' },
      { type: 'minlength', message: 'Longitud requerida minima 4 caracteres.' },
      { type: 'maxlength', message: 'Longitud Maxima 20 Carcateres.' }
    ],

    'password': [
      { type: 'required', message: 'El password es requerido.' },
      { type: 'minlength', message: 'Longitud Minima 6 Carcateres.' },
      { type: 'maxlength', message: 'Longitud Maxima 20 Carcateres.' }
    ],

    'newPassword': [
      { type: 'required', message: 'Nuevo password es requerido.' },
      { type: 'minlength', message: 'Longitud Minima 6 Carcateres.' },
      { type: 'maxlength', message: 'Longitud Maxima 20 Carcateres.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirmacion de Password es requerido.' },
      { type: 'minlength', message: 'Longitud Minima 6 Carcateres.' },
      { type: 'maxlength', message: 'Longitud Maxima 20 Carcateres.' }
    ],
  }

  constructor(
    private _location: Location,
    public formBuilder: UntypedFormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,

  ) {

    this.loginForm = this.formBuilder.group({
      uname: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ])),
      password: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      newPassword: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmPassword: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, {
      validators: this.password.bind(this)
    });

  }
  ngOnInit(
  ) {

  }

  password(formGroup: UntypedFormGroup) {
    this.newPass = formGroup.controls['newPassword'].value;
    this.confPass = formGroup.controls['confirmPassword'].value;
    return this.newPass === this.confPass ? null : { 'match': true };
  }

  goBack(){
    this._location.back();
  }

  onSubmit() {
    this.user = this.loginForm.controls['uname'].value;
    this.passwordUser = this.loginForm.controls['password'].value;
    this.newPass = this.loginForm.controls['newPassword'].value;
    this.authenticationService.reset(this.user, this.passwordUser, this.newPass )
        .pipe(first())
        .subscribe(
            data => {
              this.snackBar.open('Se realizo la actualizacion de la contraseña correctamente', 'X', {
                duration: 5000,
                panelClass: 'alert-success',
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
                this.router.navigate(['/authentication/login']);
            },
            error => {
                //this.snackBar.open('Nombre de usuario o contraseña incorrectos', 'X', {
                this.snackBar.open(error, 'X', {
                  duration: 5000,
                  panelClass: 'alert-danger',
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                console.log('AFTER error');
                console.log(error);
            });
  }

}
