import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';
import { Router } from '@angular/router';
import { SignupDataEmail, SignupDataUsername } from '../../../../shared/dist/auth/signup-data.interface';
import { Globals } from '../globals.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  usernameError='';
  passwordError='';
  errorSubscribtion: Subscription;
  constructor(private userAuthService: UserAuthenticationService, private router: Router, public globals: Globals) { }

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

  submitUsername(form: SignupDataUsername) {
    this.userAuthService.signUpViaUsername(form);
  }
  submitEmail(form: SignupDataEmail) {
    this.userAuthService.signUpViaEmail(form);
    this.router.navigateByUrl('');    
  }
}
