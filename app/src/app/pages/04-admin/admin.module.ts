import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppMaterialModule } from 'src/app/app-material-module';
import { ComponentsModule } from 'src/app/components/components.module';

import { AdminComponent } from './admin.component';
import {
  DialogVistaComponent,
} from './dialog-aprobado/dialog-aprobado.component';
import {
  DialogDocumentComponent,
} from './dialog-document/dialog-document.component';
import {
  DialogPendienteComponent,
} from './dialog-pendiente/dialog-pendiente.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import {
  DialogNotificadosInsertComponent,
} from './notificados/dialog-notificados-insert/dialog-notificados-insert.component';

@NgModule({
    declarations: [AdminComponent, DialogUpdateComponent, DialogNotificadosInsertComponent, DialogDocumentComponent, DialogVistaComponent, DialogPendienteComponent
    ],
    exports: [],
    bootstrap: [AdminComponent],
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
                component: AdminComponent
            },
        ])
    ]
})
export class AdminModule { }
