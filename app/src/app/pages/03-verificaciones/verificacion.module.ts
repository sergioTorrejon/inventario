import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VerificacionComponent } from './verificacion.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AppMaterialModule } from 'src/app/app-material-module';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogNotificadosInsertComponent } from './notificados/dialog-notificados-insert/dialog-notificados-insert.component';
import { DialogVerificadoComponent } from './dialog-verificado/dialog-verificado.component';

@NgModule({
    declarations: [VerificacionComponent, DialogUpdateComponent, DialogNotificadosInsertComponent, DialogVerificadoComponent],
    exports: [],
    bootstrap: [VerificacionComponent],
    imports: [
        ReactiveFormsModule,
        PdfViewerModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        AppMaterialModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: VerificacionComponent
            },
        ])
    ]
})
export class VerificacionModule { }
