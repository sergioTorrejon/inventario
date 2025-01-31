import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Words } from 'src/app/models/words';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dialog-aprobado',
  templateUrl: './dialog-aprobado.component.html',
  styleUrls: ['./dialog-aprobado.component.css'],
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
export class DialogVistaComponent implements OnInit {

  //Palabras Internacionalizadas
  _words = Words;
  dataNotificaciones: any = [];
  dataSeguimientos: any=[];
  disabledNotificaciones = false;
  src = "";

  constructor
  (
    private dialogRef: MatDialogRef<DialogVistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: AdminService,
  )
  {
  }

  async ngOnInit( )
  {
    if (this.data.data.rc_tipo=='RA')
    {
      this.disabledNotificaciones = true
    }

    this.rest.getNotificaciones('notificaciones',this.data.data.id).
    subscribe((data:any) => {
      this.dataNotificaciones = data.data;
    });



    await this.rest.getSeguimientos(this.data.data.id).
    subscribe((data:any) => {
      this.dataSeguimientos = data.data;
      console.log('datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata',data.data);
    });

    this.openPdf();


  }

  openPdf(){
    const pdf = this.data.data.rc_filename
    if (pdf!='')
    {
      this.rest.getFile('cartas_resoluciones', this.data.data.id).subscribe(
        (res:any) => {
          const fileURL = URL.createObjectURL(res);
          this.src =fileURL;
        });
    }

  }

  downloadPdf(){
    this.rest.getFile('cartas_resoluciones', this.data.data.id ).subscribe(
      (res:any) => {
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL, '_blank');
      });
  }

  downloadpdf() {
    this.rest.getFile('cartas_resoluciones', this.data.data.id )
      .subscribe((res: any) => {
      var newBlob = new Blob([res], { type: "application/pdf" });
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download = this.data.data.rc_numero+"-"+this.data.data.rc_year +"-"+this.data.data.entidad_short+this.data.data.rc_tipo;
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      setTimeout(function () {
          window.URL.revokeObjectURL(data);
      }, 100);
      }, (error: any) => {
          this.dialogRef.close();
          console.log(error);
      });
  }

  close(state:string) {
    this.dialogRef.close(state);
  }
}
