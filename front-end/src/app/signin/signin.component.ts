import { Component, OnInit, OnDestroy } from '@angular/core';
import { SigninDataUsername, SigninDataEmail } from '../../../../shared/dist/auth/signin-data.interface'
import { UserAuthenticationService } from '../user-authentication.service';
import { Router } from '@angular/router';
import { Globals } from '../globals.service';
import { HttpErrorHandlerService } from '../http-error-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, OnDestroy {

  usernameForm : SigninDataUsername;
  emailForm : SigninDataEmail;
  value = 4;

  usernameError = '';
  passwordError = '';

  errorSubscribtion: Subscription;
  constructor(private userAuthService: UserAuthenticationService, private router: Router, public globals: Globals) {
   }
  ngOnInit() {
    if(this.userAuthService.getUser() !== undefined) this.router.navigateByUrl("")
    this.errorSubscribtion = this.userAuthService.formErrorsSubject.subscribe(errors => {
      if(errors.hasOwnProperty("username")) this.usernameError = errors.username;
      if(errors.hasOwnProperty("password")) this.passwordError = errors.password;
    })
  }

  ngOnDestroy() {
    this.errorSubscribtion.unsubscribe();
  }

   submitUsername(form: SigninDataUsername) {
    this.userAuthService.signInViaUsername(form);
  }
  submitEmail(form: SigninDataEmail) {
    this.userAuthService.signInViaEmail(form);
    this.router.navigateByUrl('');    
  }

  handleFormErrors(errors: any) {
    if(errors.hasOwnProperty("username")) this.usernameError = errors.username;
    if(errors.hasOwnProperty("password")) this.passwordError = errors.password;
  }
}
