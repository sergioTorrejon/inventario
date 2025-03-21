import { Component, Inject, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Words } from 'src/app/models/words';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosService } from '../productos.service';
export class User {
  constructor(public name: string) { }
}


@Component({
  selector: 'app-dialog-insert',
  templateUrl: './dialog-insert.component.html',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class DialogInsertComponent implements OnInit  {
 //prueba

 filterNotificados = new UntypedFormControl('');


  //Palabras Internacionalizadas
  _words = Words;
  //Formularios
  formGroup: UntypedFormGroup;

  dataRow: any = [];
  dataNotificaciones: any = [];

  dataOptions: any = [] ;
  file:any;

  disabledNotificaciones = false;
  disabled = false;

  inputNotificados:string=''

  nameFileValidation:any={numero:'',fecha:'',tipo:'', val:'', status:''};

  dataAutoComplete: any =[] ;

  formControl:any=
  {
    'rc_inten':  ['PS', [Validators.required]],
    'rc_tipo':  ['', [Validators.required]],
    'rc_mercado':  [null, [Validators.required]],
    'rc_subtipo':  ['', [Validators.required]],
    'rc_publicar_web': [true, [Validators.required]],
    'rc_numero': [null, [Validators.required , Validators.minLength(4), Validators.maxLength(4)]],
    'rc_alfa': ['', [Validators.maxLength(1)]],
    'rc_fecha': [null, Validators.required],
    'rc_titulo':  [null, [Validators.required , Validators.minLength(2), Validators.maxLength(1000)]],
    'rc_comentarios': ['', [ Validators.minLength(2), Validators.maxLength(2000)]],
    'rc_filename':  [''],
    'etapa':  [''],
    'derivado': [''],
  };

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: ProductosService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
  }


  ngOnInit( )
  {
    this.rest.getOptions().
    subscribe((data:any) => {
      this.dataOptions = data.data;
    });

    this.formGroup.controls['rc_subtipo'].disable();
    this.formGroup.controls['rc_filename'].disable();
    this.formGroup.controls['rc_alfa'].disable();
    this.formGroup.controls['rc_tipo'].valueChanges.subscribe(async data => {
      this.disabledNotificaciones = true
      this.dataNotificaciones=[];
      this.formGroup.controls['rc_titulo'].setValue('');
      this.formGroup.controls['rc_subtipo'].enable();

      if (data!='RA'){
        this.disabledNotificaciones = false;
        this.formGroup.controls['rc_subtipo'].disable();
        this.formGroup.controls['rc_subtipo'].setValue('');
      }
    })
    this.filterNotificados.valueChanges.subscribe(async data => {

      console.log('333',data)
      this.rest.getNotificadosFilter('notificados',data).
      subscribe((data:any) => {
        this.dataAutoComplete = data;
        console.log('111',data)
      });
    })
  }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  onSubmit(post:any) {
    const formData = new FormData();
    formData.append('file', this.file);
    for (let i in post) {
      formData.append(i, post[i]);
    }
    formData.append('notificaciones', JSON.stringify(this.dataNotificaciones));
    this.rest.create('cartas_resoluciones', post, formData).
    subscribe((data:any) => {
      if (data.status === 'error') {
        this.openSnackBar(data.message,'','error')
      }
      else{
        this.close(data);
      }
    });
  }

  close(data:any) {
    this.dialogRef.close(data);
  }
}
