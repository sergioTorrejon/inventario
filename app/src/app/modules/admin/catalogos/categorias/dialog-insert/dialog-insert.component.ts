import { AfterViewInit, Component, ElementRef, Inject, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Words } from 'src/app/models/words';
import { DialogNotificadosInsertComponent } from '../notificados/dialog-notificados-insert/dialog-notificados-insert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrosService } from '../categorias.service';
export class User {
  constructor(public name: string) { }
}


@Component({
  selector: 'app-dialog-insert',
  templateUrl: './dialog-insert.component.html',
  styleUrls: ['./dialog-insert.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DialogInsertComponent implements OnInit  {
 //prueba

 filterNotificados = new UntypedFormControl('');


  //Palabras Internacionalizadas
  _words = Words;
  //Formularios
  formGroup: UntypedFormGroup;
  formGroupNotificacion: UntypedFormGroup;

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

  formControlNotificaciones:any=
  {
    't_ciudad':  [null, [Validators.required]],
    't_fecha': [null, Validators.required],
    't_hora':  [null, [Validators.required]],
    't_aquien':  [null, [Validators.required , Validators.minLength(2), Validators.maxLength(300)]],
    't_atraves': ['REPRESENTANTE LEGAL', [Validators.required , Validators.minLength(2), Validators.maxLength(300)]],
  };

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: RegistrosService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
    this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
  }


  ngOnInit( )
  {
    this.rest.getOptions().
    subscribe((data:any) => {
      this.dataOptions = data.data;
    });


    this.getNotificados();
    this.formOnchange();
    this.formGroupNotificacion.controls['t_aquien'].setValue('');
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

  enableAlpha(event: any) {
    this.formGroup.controls['rc_alfa'].enable();
    if (!event)
    {
      this.formGroup.controls['rc_alfa'].disable();
      this.formGroup.controls['rc_alfa'].setValue('')
    }
    this.formGroup.controls['rc_alfa'].setValue('')
    console.log (event)
  }

  onSelectFile(event: any) {
    this.file = event.target.files[0];
    const fileName = this.file.name.substring(0,10);
    if (fileName==this.nameFileValidation.val)
    {
      this.formGroup.controls.rc_filename.setValue(this.file.name)
      this.nameFileValidation.status='valido';
    }
    else{
      this.openSnackBar('Nombre de Archivo Invalido: '+this.file.name,'','error')
      this.clearFile();
    }
  }

  clearFile(){
    this.file='';
    this.formGroup.controls.rc_filename.setValue('')
    this.nameFileValidation.status='invalido';
  }

  formOnchange(){
    this.formGroup.controls['rc_tipo'].valueChanges.subscribe(async data => {
      this.nameFileValidation.tipo = data;
      this.validationNameFile()
    })
    this.formGroup.controls['rc_numero'].valueChanges.subscribe(async data => {
      this.nameFileValidation.numero = data;
      this.validationNameFile()
    })
    this.formGroup.controls['rc_fecha'].valueChanges.subscribe(async data => {
      this.nameFileValidation.fecha = ((new Date(data)).getFullYear()).toString().substring(2,4);
      this.validationNameFile()
    })

  }

  validationNameFile(){
    this.nameFileValidation.val='';
    this.clearFile();
    const nameVal = this.nameFileValidation.numero+'-'+this.nameFileValidation.fecha+'-'+this.nameFileValidation.tipo
    if (nameVal.length==10)
    {
      this.nameFileValidation.val=nameVal;
      this.formGroup.controls['rc_filename'].enable();
    }
  }

  deleteRow(rowSelect: any) {
    var i = this.dataNotificaciones.indexOf( rowSelect );
    this.dataNotificaciones.splice( i, 1 );
  }

  saveNotificaciones(data:any) {
    this.dataNotificaciones.push(data);
    this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
    this.filterNotificados.setValue('')
    this.formGroupNotificacion.controls['t_aquien'].setValue('');
    this.getNotificados();
    //this.getAutoComplete();
  }

  getNotificados(){
    this.rest.getNotificadosFilter('notificados').
    subscribe((data:any) => {
      this.dataAutoComplete = data;

    });
  }
  valNotificados(event: any){
    this.inputNotificados = event;
  }
  handler(event: any){
    this.filterNotificados.setValue(event.value)
    this.formGroupNotificacion.controls['t_aquien'].setValue(event.value);
  }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  insertNotificados() {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    };
    let dialogRef = this.dialog.open(DialogNotificadosInsertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getNotificados();
    });
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
