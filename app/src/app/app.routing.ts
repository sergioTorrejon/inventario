import { Routes } from '@angular/router';
import { AdminGuard } from './authentication/guard/admin.guard';
import { AuthGuard } from './authentication/guard/auth.guard';
import { ConsultaGuard } from './authentication/guard/consulta.guard';
import { OperadorGuard } from './authentication/guard/operador.guard';
import { SupervisorGuard } from './authentication/guard/supervisor.guard';
import { AppBlankComponent } from './shared/layouts/blank/blank.component';
import { FullComponent } from './shared/layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    //canActivate: [AuthGuard],
    //canActivateChild: [AuthGuard],
    children: [
      {
          path: '',
          redirectTo: '/consultas',
          pathMatch: 'full'
      },

// ***************************************01-ARCHIVOS********************************************//

      {
        path: 'consultas',
        //canActivate: [AuthGuard],
        canActivate: [ConsultaGuard],
        loadChildren: () => import('./pages/01-consultas/consultas.module').then(m => m.ConsultasModule)
      },
      {
        path: 'productos',
        //canActivate: [AuthGuard],
        canActivate: [OperadorGuard],
        loadChildren: () => import('./pages/02-productos/productos.module').then(m => m.ProductosModule)
      },
      {
        path: 'almacen',
        //canActivate: [AuthGuard],
        canActivate: [OperadorGuard],
        loadChildren: () => import('./pages/03-registros/registros.module').then(m => m.RegistrosModule)
      },
      {
        path: 'administrador',
        //canActivate: [AuthGuard],
        //canActivate: [AdminGuard],
        loadChildren: () => import('./pages/04-admin/admin.module').then(m => m.AdminModule)
      },
    ]
  },

  {
    path: '',
    component: AppBlankComponent,
      children: [
        {
            path: 'authentication',
            loadChildren:
                () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
        }
      ]
  },
  {
      path: '**',
      redirectTo: 'authentication/404'
  }
];
