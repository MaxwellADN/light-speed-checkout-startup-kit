import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/utils/toast.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PasswordValidationService } from 'src/app/core/utils/password-validation.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  /**
   * User form group
   */
  public userFormGroup!: FormGroup;
  /**
   * To display a spinner
   */
  public loading = false;

  /** 
   * token from account recovery link
   */
  private token: string = this.activatedRoute.snapshot.params["token"];
  /**
   * Json web token helper
   */
  private jwtHelper: JwtHelperService;
  /**
   * Valid password boolean
   */
  public validPassword = false;
  /**
   * Invalid password message to display
   */
  public invalidPasswordMessage!: string;

  /**
   * The constructor function is used to inject the FormBuilder, AuthService, ToastService,
   * TranslateService, and Router services into the LoginComponent class
   * @param {FormBuilder} formBuilder - This is used to create the form.
   * @param {AuthService} authService - This is the service that will be used to authenticate the user.
   * @param {ToastService} toastService - This is the service that will be used to display the toast
   * messages.
   * @param {TranslateService} translate - TranslateService - This is the service that will be used to
   * translate the text.
   * @param {Router} router - Router - This is the Angular Router service that allows us to navigate to
   * different routes in our application.
   * @param {PasswordValidationService} passwordValidationService - This is the service that will use to check password is valid.
   */
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private passwordValidationService: PasswordValidationService,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  /**
   * We're initializing the form group by calling the initFormGroup() function
   */
  ngOnInit(): void {
    this.checkUserAccessToCurrentPage();
    this.initFormGroup();
  }

  /**
   * We're creating a new FormGroup object and assigning it to the signInFormGroup property
   */
  private initFormGroup(): void {
    this.userFormGroup = this.formBuilder.group({
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
    })
  }

  /**
   * The function takes a user object as a parameter, checks if the form is valid, checks if the
   * password and password confirmation match, and if they do, it calls the authService's
   * updatePassword function, which sends a request to the backend to update the user's password
   * @param {User} user - User - the user object that contains the new password
   */
  public updatePassword(user: User): void {
    if (this.userFormGroup.valid) {
      if (user.password === this.userFormGroup.get('passwordConfirmation')?.value) {
        this.loading = true;
        const email = this.jwtHelper.decodeToken(this.token).email;
        user.email = email;
        this.authService.updatePassword(user).subscribe({
          next: () => {
            this.loading = false;
            this.toastService.showToast('success', this.translate.instant('app.accountRecovery.success'));
            this.router.navigateByUrl('/auth/sign-in');
          },
          error: (error) => {
            console.log(error);
            this.loading = false;
            this.toastService.showToast('danger', this.translate.instant('app.errors.badRequest'));
          }
        })
      } else {
        this.toastService.showToast('warning', this.translate.instant('app.resetPassword.passwordMatchWarn'));
      }
    }
  }

  /**
   * If the token is expired, return false, otherwise return true
   * @returns A boolean value.
   */
  private get isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  /**
   * If the token is not valid, redirect the user to the sign-in page
   */
  private checkUserAccessToCurrentPage(): void {
    if (this.isTokenExpired) this.router.navigateByUrl('/auth/sign-in');
  }

  /**
 * It takes the password from the input field, passes it to the password validation service, and then
 * sets the validPassword and wrongPasswordMessage variables based on the result
 * @param {any} event - any - the event that is triggered when the user types in the password field.
 */
  public onPasswordKeyup(event: any): void {
    const password = event.target.value;
    const passwordValidation = this.passwordValidationService.isPasswordValid(password);
    this.validPassword = passwordValidation.valid;
    this.invalidPasswordMessage = passwordValidation.message!;
  }

}
