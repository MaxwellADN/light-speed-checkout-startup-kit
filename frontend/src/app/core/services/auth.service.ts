import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService<User> {

  /**
   * The constructor function is a special function that is called when an object is created from a
   * class
   * @param {HttpClient} http - HttpClient - this is the Angular HttpClient service
   */
  constructor(http: HttpClient, private router: Router) { 
    super(http, '/auth');
  }

  /**
   * It takes a User object as a parameter, and returns an Observable of type User
   * @param {User} entity - User - The entity that we want to send to the server.
   * @returns Observable<User>
   */
  public signUp(entity: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+`/sign-up`, entity);
  }

  /**
   * It takes a User object as a parameter, and returns an Observable of type User
   * @param {User} entity - User - The user object that will be sent to the server.
   * @returns Observable<User>
   */
  public signIn(entity: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+`/sign-in`, entity);
  }

  /**
   * This function sends a POST request to the server with the user's email address. The server then
   * sends an email to the user with a link to reset their password
   * @param {User} entity - User - The user object that you want to send the account recovery link to.
   * @returns The user object
   */
  public sendAccountRecoveryLink(entity: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+`/account-recovery`, entity);
  }

  public updatePassword(entity: User): Observable<User> {
    return this.http.put<User>(this.apiUrl+`/reset-password`, entity, { headers: this.headers });
  }

  /**
   * It removes the user from local storage and navigates to the sign-in page
   */
  public logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/auth/sign-in');
  }
}
