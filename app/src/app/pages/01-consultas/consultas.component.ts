import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Words } from 'src/app/models/words';

import {
  AuthorizationService,
} from '../../authentication/services/authorization.service';
import { ConsultasService } from './consultas.service';
import {
  DialogAprobadoComponent,
} from './dialog-aprobado/dialog-aprobado.component';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
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
export class ConsultasComponent implements OnInit {

  //Palabras Internacionalizadas
  _words = Words;

  // Variables del Formulario
  formGroup: UntypedFormGroup;
  formControl:any=
  {
    model:['cartas_resoluciones'],
    modulo:[''],
    entidad:['PS'],
    year:['0'],
    tipo:[''],
    subtipo:[''],
    mercado:[''],
    numero:[''],
    titulo:[''],
    del:[''],
    al:[''],
  };

  //Pagination and Sort
  //sort
  sort: string = '';
  order: string = '';
  // Pagination Table
  page = {
    size: 10,
    index: 0,
  };

  // Data
  data: any ;
  count = 0;
  dataOptions: any = [];

  //Congif Table
  headersTable: any =
  [
    {name:'rc_inten', label:'Institución', width:15},
    {name:'rc_tipo', label:'Documento',  width:10},
    {name:'rc_subtipo', label:'Tipo Resolución',  width:10},
    {name:'rc_numero', label:'Número',  width:7},
    {name:'rc_fecha', label:'Fecha',  width:8},
    {name:'rc_titulo', label:'Título / Referencia', width:45},
  ];


  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public rest: ConsultasService,
    public authorizationService: AuthorizationService,
    private _snackBar: MatSnackBar
    ) {
      this.formGroup =this.formBuilder.group([]);
    }

    ngOnInit() {
      this.setForm();
      this.getParams();
    }

  setForm(){
    this.formGroup =this.formBuilder.group(this.formControl);
    this.formGroup.controls['subtipo'].disable();
    this.formOnchange();
    this.dataTableUpdate(this.page);
  }

  getParams(){
    this.rest.getOptions().subscribe((data:any) => {
      this.dataOptions = data.data;
    });
  }

  formOnchange(){
    this.formGroup.valueChanges.subscribe(async data => {
      this.dataTableUpdate(this.page);
    })
    this.formGroup.controls['tipo'].valueChanges.subscribe(async data => {
      this.formGroup.controls['subtipo'].enable();

      if (data!='RA'){
        this.formGroup.controls['subtipo'].disable();
        this.formGroup.controls['subtipo'].setValue('');
      }
    })
  }

  sortData(event:any){
    this.sort = event.active;
    this.order = event.direction;
    if (this.order == ""){
      this.sort = 'id';
    }
    this.dataTableUpdate(this.page);
  }

  dataTableUpdate(event: any){
    this.page.size = event.pageSize !== undefined? event.pageSize: 10;
    this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
    const dto = (this.formGroup).getRawValue();
    this.rest.getDocs(dto,this.page.index+1, this.page.size,this.sort, this.order)
    .subscribe((data:any) => {
      this.data = data.data;
      this.count = data.count;
    });
    this.rest.getUsuarios().subscribe((data:any) => {
    });
  }

  documentRow(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
      };
    let dialogRef = this.dialog.open(DialogAprobadoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result === 'confirm') {
        this.openSnackBar('Se ACTUALIZO el registro correctamente','','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
    });
  }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  openPdf(row:any){
    this.rest.getFile(this.formGroup.controls.model.value, row.id ).subscribe(
      (res:any) => {
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL, '_blank');
      });
  }

  downloadxlsx() {
    const dto = (this.formGroup).getRawValue();
    this.rest.getCsv(dto,this.sort, this.order)
    .subscribe((result: any) => {
        const newBlob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = data;
        link.target = '_blank';
        link.download = 'Reporte'+this.formGroup.controls.model.value+ ''+'.xlsx';
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
            window.URL.revokeObjectURL(data);
        }, 100);
    }, (error: any) => {
        console.log(error);
    });
  }

  downloadpdf() {
      const dto = (this.formGroup).getRawValue();
      this.rest.getPdf(dto,this.sort, this.order)
    .subscribe((res: any) => {
      var newBlob = new Blob([res], { type: "application/pdf" });
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download = "ReporteCartas Resoluciones.pdf";
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      setTimeout(function () {
          window.URL.revokeObjectURL(data);
      }, 100);
    }, (error: any) => {
        console.log(error);
    });
  }

  downloadManual() {
    this.rest.getManual()
  .subscribe((res: any) => {
    var newBlob = new Blob([res], { type: "application/pdf" });
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = "Manual de Usuario.pdf";
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    setTimeout(function () {
        window.URL.revokeObjectURL(data);
    }, 100);
  }, (error: any) => {
      console.log(error);
  });
  }
}
