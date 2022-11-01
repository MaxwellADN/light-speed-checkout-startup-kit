import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from 'src/app/core/utils/toast.service';
import { SocialLoginModule } from 'angularx-social-login';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    AccountRecoveryComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbLayoutModule,
    NbCardModule,
    SharedModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    TranslateModule,
    NbSpinnerModule,
    NbIconModule,
    SocialLoginModule,
    NbToastrModule.forRoot(),
  ],
  providers: [ToastService]
})
export class AuthModule { }
