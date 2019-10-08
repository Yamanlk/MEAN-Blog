import { Component, OnInit} from '@angular/core';
import { ISUser } from '../../../shared/dist/data/user.interface';
import { UserAuthenticationService } from './user-authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'JS Bloger';
  user: ISUser;
  
  constructor(public authService: UserAuthenticationService, private router: Router, private notificationService: NotificationService) {}
  ngOnInit(): void { 
    this.user = this.authService.getUser();
    this.authService.loggedUserSubject.subscribe(user => {
      this.user = user;
    }) 
  }

  onCreatButtonClick() {
    if(this.user) this.router.navigateByUrl('blog/creat');
    else {
      this.router.navigateByUrl('auth/signin');
      this.notificationService.addNotification('Please signin first');
    }
  }

}