import { Injectable, NgModule } from '@angular/core';
import { ISUser } from '../../../shared/dist/data/user.interface'
import { Subject } from 'rxjs';
import { SigninDataUsername, SigninDataEmail } from '../../../shared/dist/auth/signin-data.interface';
import { SignupDataUsername, SignupDataEmail } from '../../../shared/dist/auth/signup-data.interface';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from "jwt-decode"
import { CookieService } from 'ngx-cookie-service';
import { ERRORS } from 'shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private loggedUser: ISUser;
  loggedUserSubject = new Subject<ISUser>();
  formErrorsSubject = new Subject<any>();

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }


  getUser(): ISUser {
    this.updateLoggedUser();
    return this.loggedUser ? {...this.loggedUser} : undefined;
  }

  updateUser(user: ISUser) {
    this.http.post("http://localhost:3000/api/auth/update", user, {observe: "response"}).subscribe(resp => {
      if(resp.status === 200) {
        this.loggedUser = resp.body;
        this.updateLoggedUser();
      }
    })
  }

  updateLoggedUser(): void {
    if (this.cookieService.get("user")) {
      this.loggedUser = (jwtDecode(this.cookieService.get("user")));
      this.loggedUserSubject.next(this.loggedUser);
    }
  }

  signInViaUsername(form: SigninDataUsername): void {
    this.http.post<any>('http://localhost:3000/api/auth/login', form, { "observe": "response" }).subscribe(resp => {
      if (resp.status === ERRORS.InvalidData.status) {
        this.formErrorsSubject.next(resp.body);
      } else if (resp.status === 200) {
        this.updateLoggedUser();
        location.reload();
      }
    });
  }

  signInViaEmail(form: SigninDataEmail): void {
    //needs to be implemented on server
  }

  signUpViaUsername(form: SignupDataUsername): void {
    this.http.post<any>('http://localhost:3000/api/auth/signup', form, { "observe": "response" }).subscribe(resp => {
      if (resp.status === ERRORS.InvalidData.status) {
        this.formErrorsSubject.next(resp.body);
      } else if (resp.status === 201) {
        this.updateLoggedUser();
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
    this.router.navigateByUrl("auth/signin");
  }
}
