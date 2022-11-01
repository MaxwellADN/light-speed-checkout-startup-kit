import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PasswordValidationService } from 'src/app/core/utils/password-validation.service';
import { ToastService } from 'src/app/core/utils/toast.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  /**
   * Sign up formGroup 
   */
  public signUpFormGroup!: FormGroup;
  /**
   * Loading boolean
   */
  public loading = false;
  /**
   * Valid password boolean
   */
  public validPassword = false;

  /**
   * Password validaton message
   */
  public wrongPasswordMessage: string | null = null;
  /** 
   * To use social login 
   */
  public useSocialLogin = false;

  /**
   * This function is the constructor of the class. It is called when the class is instantiated. It is
   * used to initialize class members
   * @param {FormBuilder} formBuilder - FormBuilder - This is used to create the form.
   * @param {ToastService} toastService - This is a service that will be used to display a toast
   * message to the user.
   * @param {TranslateService} translate - TranslateService - This is the service that will be used to
   * translate the text in the form.
   * @param {Router} router - Router - This is the Angular Router service. We'll use this to navigate
   * to the home page after a successful login.
   * @param {SocialAuthService} socialAuthService - This is the service that handles the social login.
   * @param {PasswordValidationService} passwordValidationService - This is a service that we will
   * create in the next step.
   * @param {AuthService} authService - This is the service that will be used to authenticate the user.
   */
  constructor(private formBuilder: FormBuilder,
    private toastService: ToastService,
    private translate: TranslateService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private passwordValidationService: PasswordValidationService,
    private authService: AuthService) { }

  /**
   * The function is called when the component is initialized
   */
  ngOnInit(): void {
    this.initSocialLogin();
    this.initFormGroup();
  }

  /**
   * The function takes a user object as a parameter, sets the loading variable to true, checks if the
   * form is valid, checks if the user agreed with the terms, and if so, calls the signUp function from
   * the authService and subscribes to the result
   * @param {User} user - User - the user object that we want to send to the server.
   * @returns The result of the signUp function is a void.
   */
  public signUp(user: User): void {
    const pwdValidation = this.passwordValidationService.isPasswordValid(user.password);
    if (this.signUpFormGroup.valid && pwdValidation.valid) {
      this.loading = true;
      user.originUrl = window.location.origin;
      if (!user.agreeWithTerms) {
        this.toastService.showToast('warning', this.translate.instant('app.signUp.errors.agreeWithTerms'));
        return;
      }
      this.authService.signUp(user).subscribe({
        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result));
          this.loading = false;
          this.toastService.showToast('success', this.translate.instant('app.signUp.successSignUp'));
          this.router.navigateByUrl('/app/dashboard');
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
          if (error.status === 409) {
            this.toastService.showToast('warning', this.translate.instant('app.signUp.conflit'));
          } else if (error.status === 401) {
            this.toastService.showToast('danger', this.translate.instant('app.signUp.wrongId'));
          } else {
            this.toastService.showToast('danger', this.translate.instant('app.errors.badRequest'));
          }
        }
      });
    }
  }

  /**
   * We're creating a new FormGroup object and assigning it to the signUpFormGroup property
   */
  public initFormGroup(): void {
    this.signUpFormGroup = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      agreeWithTerms: false
    });
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
    this.wrongPasswordMessage = passwordValidation.message;
  }

  /**
   * The function calls the signIn() function of the socialAuthService object, passing in the
   * GoogleLoginProvider.PROVIDER_ID constant as the parameter
   */
  public signUpWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  /**
   * The function calls the signIn() function of the socialAuthService object, passing in the
   * FacebookLoginProvider.PROVIDER_ID constant as the parameter
   */
  public signUpWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  /**
   * If the user is logged in with a social account and the current route is `/auth/sign-up`, then
   * create a new user object and pass it to the `signUp` function
   */
  private initSocialLogin() {
    this.socialAuthService.authState.subscribe((socialUser) => {
      if (socialUser && this.router.url.startsWith('/auth/sign-up')) {
        this.useSocialLogin = true;
        const user = new User({
          fullname: `${socialUser.firstName} ${socialUser.lastName}`,
          email: socialUser.email,
          useSocialLogin: true,
          agreeWithTerms: true,
          verifiedEmail: true,
        });
        this.signUp(user)
      }
    });
  }
}
