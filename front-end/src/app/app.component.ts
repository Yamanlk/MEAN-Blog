import { Component, OnInit, HostListener, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ISUser } from '../../../shared/dist/data/user.interface';
import { UserAuthenticationService } from './user-authentication.service';
import { Router, RouterOutlet } from '@angular/router';
import { NotificationService } from './notification.service';
import { MatSidenavContent } from '@angular/material';
import { BlogService } from './blog.service';
import { BlogComponent } from './blog/blog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  
  title = 'JS Bloger';
  user: ISUser;
  
  @ViewChild(BlogComponent, {static: false}) private blog: BlogComponent

  constructor(public authService: UserAuthenticationService, private router: Router, private notificationService: NotificationService, private blogService: BlogService) { }
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.authService.loggedUserSubject.subscribe(user => {
      this.user = user;
    })
  }

  onActive(event) {
    if(event instanceof BlogComponent)
    this.blog = event;
  }

  onScroll(matNavContent: MatSidenavContent) {
    if(this.blog instanceof BlogComponent)
    if(matNavContent.getElementRef().nativeElement.scrollTop + window.innerHeight >= document.getElementsByClassName("blog")[0].clientHeight)
    this.blog.onLoadOnScroll();
  }

  onCreatButtonClick() {
    if (this.user) this.router.navigateByUrl('blog/creat');
    else {
      this.router.navigateByUrl('auth/signin');
      this.notificationService.addNotification('Please signin first');
    }
  }

}