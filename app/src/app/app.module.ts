import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './authentication/helpers/jwt.interceptor';
import { ErrorInterceptor } from './authentication/helpers/error.interceptor';
import { LoaderInterceptor } from './authentication/helpers/spinner.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material-module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SharedModule } from './shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppBlankComponent } from './shared/layouts/blank/blank.component';
import { AppHeaderComponent } from './shared/layouts/full/header/header.component';
import { AppSidebarComponent } from './shared/layouts/full/sidebar/sidebar.component';
import { FullComponent } from './shared/layouts/full/full.component';
import { getEsPaginatorIntl } from './components/translation/es-paginator-intl';
import { ComponentsModule } from './components/components.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
//import { AbmComponent } from './abm/abm.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        AppBlankComponent,
        AppHeaderComponent,
        AppSidebarComponent,
    ],
    imports: [
        ComponentsModule,
        BrowserModule,
        PdfViewerModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        SharedModule,
        NgxMatSelectSearchModule,
        RouterModule.forRoot(AppRoutes),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['192.168.59.140:3001'],
                blacklistedRoutes: ['192.168.59.140:3001/auth/']
            }
        }),
    ],
    providers: [AppComponent,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
