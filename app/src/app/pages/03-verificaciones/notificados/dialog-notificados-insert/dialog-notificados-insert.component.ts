import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Words } from 'src/app/models/words';
import { VerificacionService } from '../../verificacion.service';

@Component({
  selector: 'app-dialog-notificados-insert',
  templateUrl: './dialog-notificados-insert.component.html',
  styleUrls: ['./dialog-notificados-insert.component.css'],
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
export class DialogNotificadosInsertComponent implements OnInit {

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

  publicar: any =
  [
    {value:true , label:'publicar'},
    {value:false , label:'No Publicar'},
  ];

  formControl:any=
  {
    'descripcion':  [null, [Validators.required , Validators.minLength(2), Validators.maxLength(300)]],
  };


  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogNotificadosInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: VerificacionService,
    private dialog: MatDialog,
  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
  }

  async ngOnInit( )
  {
    this.rest.getOptions().
    subscribe((data:any) => {
      this.dataOptions = data.data;
    });
    //this.formGroup.controls['rc_subtipo'].disable();
    //this.formGroup.controls['rc_alfa'].disable();
    //this.formGroup.controls['rc_tipo'].valueChanges.subscribe(async data => {
    //  this.disabledNotificaciones = true
    //  this.dataNotificaciones=[];
    //  this.formGroup.controls['rc_subtipo'].enable();
    //  if (data!='RA'){
    //    this.disabledNotificaciones = false;
    //    this.formGroup.controls['rc_subtipo'].disable();
    //    this.formGroup.controls['rc_subtipo'].setValue('');
    //  }
    //})
  }



  onSubmit(post:any) {
    this.rest.createSimple('notificados', post).
    subscribe((data:any) => {
      this.dataRow = data.data;
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
