import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   * Verification email message
   */
  public verifiedEmailMessage!: string;
  /**
   * Token from account verification email
   */
  private token: string = this.activatedRoute.snapshot.params['token'];
  /**
   * Json web token helper
   */
  private jwtHelper: JwtHelperService;

  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created
   * @param {ActivatedRoute} activatedRoute - This is the route that is currently active.
   * @param {TranslateService} translate - TranslateService - This is the service that we will use to
   * translate our application.
   */
  constructor(private activatedRoute: ActivatedRoute, private translate: TranslateService, private authService: AuthService) {
    this.jwtHelper = new JwtHelperService();
   }

  /**
   * The function checks if the user is verified
   */
  ngOnInit(): void {
    this.checkVerifiedAccount();
  }

  /**
   * The logout function calls the logout function in the authService
   */
  public logout() {
    this.authService.logout();
  }

  /**
   * If the token is not expired, then display a message to the user
   */
  private checkVerifiedAccount(): void {
    if (this.token && !this.isTokenExpired) {
      this.verifiedEmailMessage = this.translate.instant('app.verifiedEmailMessage');
    }
  }

  /**
   * If the token is expired, return false, otherwise return true
   * @returns A boolean value.
   */
  private get isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.token);
  }
}
