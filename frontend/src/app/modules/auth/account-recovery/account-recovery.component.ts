import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/utils/toast.service';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent implements OnInit {
  /**
   * User form group
   */
  public userFormGroup!: FormGroup;
  /**
   * To display a spinner
   */
  public loading = false;

  /**
   * The constructor function is used to initialize the class
   * @param {FormBuilder} formBuilder - FormBuilder is used to create the form.
   * @param {AuthService} authService - This is the service that will be used to authenticate the user.
   * @param {TranslateService} translate - TranslateService - This is the service that will be used to
   * translate the text in the form.
   * @param {ToastService} toastService - This is the service that will be used to display the toast
   * messages.
   * @param {Router} router - Router - This is the Angular Router service that we'll use to navigate to
   * the home page after the user has logged in.
   */
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private toastService: ToastService,
    private router: Router) { }
/**
 * This function sends a POST request to the server with the user's email address. The server then
 * sends an email to the user with a link to reset their password
 * @param {User} entity - User - The user object that you want to send the account recovery link to.
 * @returns The user object
 */

  /**
   * The function is called when the component is initialized
   */
  ngOnInit(): void {
    this.initFormGroup();
  }

  /**
   * We're creating a new FormGroup object and assigning it to the userFormGroup property
   */
  private initFormGroup(): void {
    this.userFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
    })
  }

  /**
   * The function sends a request to the backend to send an account recovery link to the user's email
   * @param {User} user - User - the user object that contains the email address of the user
   */
  public sendAccountRecoveryLink(user: User): void {
    if (this.userFormGroup.valid) {
      this.loading = true;
      user.originUrl = window.location.origin;
      this.authService.sendAccountRecoveryLink(user).subscribe({
        next: () => {
          this.loading = false;
          this.toastService.showToast('success', this.translate.instant('app.accountRecovery.success'));
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
          if (error.status === 404) {
            this.toastService.showToast('warning', this.translate.instant('app.accountRecovery.notFoundEmail'));
          } else {
            this.toastService.showToast('danger', this.translate.instant('app.errors.badRequest'));
          }
        }
      })  
    }
  }

}
