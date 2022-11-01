import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/utils/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  /**
   * Our sign in form group
   */
  public signInFormGroup!: FormGroup;
  /**
   * Loading boolean
   */
  public loading = false;
  /** 
   * To use social login 
   */
  public useSocialLogin = false;

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
   * @param {SocialAuthService} socialAuthService - This is the service that handles the social login.
   */
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private translate: TranslateService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) { }

  /**
   * The function is called when the component is initialized
   */
  ngOnInit(): void {
    this.initSocialLogin();
    this.initFormGroup();
  }

  /**
   * We're creating a new FormGroup object and assigning it to the signInFormGroup property
   */
  private initFormGroup(): void {
    this.signInFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    })
  }

  /**
   * The function takes a user object as a parameter, checks if the form is valid, sets the loading
   * variable to true, calls the signIn function from the authService, and subscribes to the result. If
   * the result is successful, it sets the user in local storage, sets the loading variable to false,
   * shows a success toast, and navigates to the dashboard. If the result is unsuccessful, it sets the
   * loading variable to false, logs the error, shows a toast with the error message, and navigates to
   * the dashboard
   * @param {User} user - User - the user object that we want to send to the server.
   */
  public signIn(user: User) {
    if (this.signInFormGroup.valid || this.useSocialLogin) {
      this.loading = true;
      this.authService.signIn(user).subscribe({
        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result));
          this.loading = false;
          this.toastService.showToast('success', this.translate.instant('app.signUp.successSignUp'));
          this.router.navigateByUrl('/app/dashboard');
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
          if (error.status === 401) {
            this.toastService.showToast('danger', this.translate.instant('app.signUp.wrongId'));
          } else {
            this.toastService.showToast('danger', this.translate.instant('app.errors.badRequest'));
          }
        }
      });
    }
  }

  /**
   * It calls the signIn() function of the socialAuthService object, passing in the
   * GoogleLoginProvider.PROVIDER_ID constant as a parameter
   */
  public signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  /**
   * The function calls the signIn() function of the socialAuthService object, passing in the
   * FacebookLoginProvider.PROVIDER_ID constant as a parameter
   */
  public signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  /**
   * If the user is logged in with a social account and the current route is `/auth/sign-in`, then sign
   * in the user
   */
  private initSocialLogin() {
    this.socialAuthService.authState.subscribe((socialUser) => {
      if (socialUser && this.router.url.startsWith('/auth/sign-in')) {
        this.useSocialLogin = true;
        const user = new User({
          fullname: `${socialUser.firstName} ${socialUser.lastName}`,
          email: socialUser.email,
          useSocialLogin: true,
          agreeWithTerms: true,
          verifiedEmail: true,
          rememberBe: true,
        });
        this.signIn(user)
      }
    });
  }

}
