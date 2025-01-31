import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  MessageBoxComponent,
} from 'src/app/components/dialogs/message-box/message-box.component';
import { Words } from 'src/app/models/words';

import {
  AuthorizationService,
} from '../../authentication/services/authorization.service';
import { AdminService } from './admin.service';
import {
  DialogVistaComponent,
} from './dialog-aprobado/dialog-aprobado.component';
import {
  DialogPendienteComponent,
} from './dialog-pendiente/dialog-pendiente.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  //Palabras Internacionalizadas
  _words = Words;

  // Variables del Formulario
  formGroup: UntypedFormGroup;
  formControl:any=
  {
    model:['cartas_resoluciones'],
    entidad:['PS'],
    modulo:['REGISTRO'],
    etapa:[''],
    year:['0'],
    tipo:[''],
    subtipo:[''],
    mercado:[''],
    numero:[''],
    titulo:[''],
    del:[''],
    al:[''],
  };

  //sort
  sort: string = '';
  order: string = '';

  //table
  data: any ;
  count = 0;
  dataOptions: any = [];
  page = {
    length: 10,
    size: 10,
    index: 0,
  };


  headersTable: any =
  [
    //FORMULARIO
    {name:'rc_tipo', label:'Documento',  width:15},
    {name:'rc_tipo', label:'Tipo de Resolución',  width:19},
    {name:'rc_numero', label:'Número',  width:8},
    {name:'rc_fecha', label:'Fecha',  width:8},
    {name:'etapa', label:'Etapa',  width:8},
    {name:'rc_titulo', label:'Título / Referencia', width:32},
  ];

  estado: any =
  [
    //FORMULARIO
    {value:'CREADO', label:'CREADO'},
    {value:'PENDIENTE', label:'PENDIENTE'},
    {value:'APROBADO', label:'APROBADO'},
  ];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public rest: AdminService,
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
    }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  updateRow(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
      };
    let dialogRef = this.dialog.open(DialogUpdateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.openSnackBar('Se ACTUALIZO el registro correctamente','','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
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
    //let dialogRef = this.dialog.open(DialogDocumentComponent, dialogConfig); // Leyendo el Dialog Normal
    let dialogRef = this.dialog.open(DialogVistaComponent, dialogConfig);//Leyendo el Dialog de consultas
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.openSnackBar('Se ACTUALIZO el registro correctamente','','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
    });
  }

  pendienteRow(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
      };
    //let dialogRef = this.dialog.open(DialogDocumentComponent, dialogConfig); // Leyendo el Dialog Normal
    let dialogRef = this.dialog.open(DialogPendienteComponent, dialogConfig);//Leyendo el Dialog de consultas
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.openSnackBar('Se ACTUALIZO el registro correctamente','','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
    });
  }

  deleteRow(rowSelect: any) {
    let dialogMessage = this.dialog.open(MessageBoxComponent, {
      disableClose: true,
      autoFocus: true,
      data: {
        cancelarBtn: true,
        aceptarBtn: true,
        titulo: 'Mensaje',
        descripcion: 'Se eliminara el registro Seleccionado',
      },
    });
    dialogMessage.afterClosed().subscribe((result1) => {
      if (result1 === 'confirm') {
        this.rest.delete(this.formGroup.controls.model.value, rowSelect.id)
          .subscribe((data: any) => {
            this.openSnackBar('Se eliminó el registro correctamente','','warning')
            this.dataTableUpdate({ pageSize: 10, pageIndex: 0, sort: '' });
          });
      }
    });
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
    this.rest.getCsv(dto,this.page.index+1, this.page.size,this.sort, this.order)
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
      this.rest.getPdf(dto,this.page.index+1, this.page.size,this.sort, this.order)
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


}

