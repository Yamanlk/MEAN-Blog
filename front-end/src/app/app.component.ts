import { Component, OnInit} from '@angular/core';
import { ISUser } from '../../../shared/dist/data/user.interface';
import { UserAuthenticationService } from './user-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: UserAuthenticationService) {}
  ngOnInit(): void { 
    this.user = this.authService.getUser();
  }
  title = 'JS Bloger';
  user: ISUser;
  isLoggedin : boolean;

}