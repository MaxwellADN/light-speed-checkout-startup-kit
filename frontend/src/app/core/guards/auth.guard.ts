import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created
   * @param {Router} router - Router - This is the singleton instance of the Angular Router service.
   */
  constructor(private router: Router) { }

  /**
   * If the user is logged in and has the correct role, then return true. Otherwise, redirect to the
   * login page
   * @param {ActivatedRouteSnapshot} route - ActivatedRouteSnapshot - The route that is being accessed.
   * @param {RouterStateSnapshot} state - RouterStateSnapshot - The current router state
   * @returns A boolean value.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwtHelper = new JwtHelperService();
    const user: User = JSON.parse(localStorage.getItem('user')!);
    const roles = <string[]>route.data['permittedRoles'];
    if (user?.token && !jwtHelper.isTokenExpired(user.token)) {
      if (!!roles?.length && roles.includes(user.role?.name!)) {
        return true;
      }
    }
    this.router.navigateByUrl('/auth/sign-in')
    return false;
  }

}
