import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NbActionsModule, NbButtonModule, NbContextMenuModule, NbIconModule, NbLayoutModule, NbMenuModule, NbUserModule } from '@nebular/theme';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbContextMenuModule,
    NbMenuModule,
    NbMenuModule.forRoot(),
    NbActionsModule,
    NbUserModule,
  ]
})
export class AdminModule { }
