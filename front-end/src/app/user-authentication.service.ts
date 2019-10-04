import { Injectable, NgModule } from '@angular/core';
import { ISUser } from '../../../shared/dist/data/user.interface'
import { Subject } from 'rxjs';
import { SigninDataUsername, SigninDataEmail } from '../../../shared/dist/auth/signin-data.interface';
import { SignupDataUsername, SignupDataEmail } from '../../../shared/dist/auth/signup-data.interface';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from "jwt-decode"
import { CookieService } from 'ngx-cookie-service';
import { ErrorStatus } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private loggedUser: ISUser;
  loggedUserSubject = new Subject<ISUser>();
  formErrorsSubject = new Subject<any>();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUser(): ISUser {
    if (this.cookieService.get("user")) {
      this.loggedUser = (jwtDecode(this.cookieService.get("user")));
    }
    if (this.loggedUser === undefined || Object.keys(this.loggedUser).length === 0) return undefined;
    return { ...this.loggedUser };
  }

  signInViaUsername(form: SigninDataUsername): void {
    this.http.post<any>('http://localhost:3000/api/auth/login', form, { "observe": "response" }).subscribe(resp => {
      if (resp.status === ErrorStatus.InvalidData) {
        this.formErrorsSubject.next(resp.body);
      } else if (resp.status === 200) {
        this.loggedUser = resp.body;
        this.loggedUserSubject.next(this.loggedUser);
        location.reload();
      }
    });
  }

  signInViaEmail(form: SigninDataEmail): void {
    //needs to be implemented on server
  }

  signUpViaUsername(form: SignupDataUsername): void {
    this.http.post<any>('http://localhost:3000/api/auth/signup', form, { "observe": "response" }).subscribe(resp => {
      if (resp.status === ErrorStatus.InvalidData) {
        this.formErrorsSubject.next(resp.body);
      } else if (resp.status === 200) {
        this.loggedUser = resp.body;
        this.loggedUserSubject.next(this.loggedUser);
        location.reload();
      }
    })
  }

  signUpViaEmail(form: SignupDataEmail): void {
    //needs to be implemented on server
  }

  logout() {
    this.cookieService.delete("user", "/", "localhost");
    this.loggedUser = undefined;
    this.loggedUserSubject.next(this.loggedUser);
    location.reload();
  }
}
