import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material-module';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { SpinnerComponent } from './spinner/spinner.component';
import { MessageBoxComponent } from './dialogs/message-box/message-box.component';

@NgModule({
    declarations: [
        //Messages
        MessageBoxComponent,
        //Spinner
        SpinnerComponent,
        //modals
        //tables
        //panels
        //searchs
        //forms
        //Crud
    ],
    exports: [
        //Messages
        MessageBoxComponent,
        //Spinner
        SpinnerComponent,
        //modals
        //tables
        //panels
        //searchs
        //forms
        //Crud
    ],
    imports: [
        FlexLayoutModule,
        CommonModule,
        ChartistModule,
        MatDialogModule,
        MatButtonToggleModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        AppMaterialModule,
        MatListModule,
        MatDatepickerModule,
        ReactiveFormsModule,
    ]
})
export class ComponentsModule {}
