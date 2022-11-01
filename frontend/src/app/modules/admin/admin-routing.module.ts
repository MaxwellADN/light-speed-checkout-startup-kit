import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        data: { permittedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.USER, UserRoleEnum.VIEWER] }
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
        data: { permittedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.USER, UserRoleEnum.VIEWER] }
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
