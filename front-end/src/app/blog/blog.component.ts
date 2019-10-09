import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { ISArticle } from 'shared';
import { BlogService } from '../blog.service';
import { NotificationService } from '../notification.service';
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-blog ',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  articles: ISArticle[] = []
  from = 0;
  count = 5;
  isLoading: boolean = false;
  subscription: Subscription;
  isEmpty: boolean = false;

  constructor(private blogService: BlogService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.subscription = this.blogService.subjectArticles.subscribe(fetchedArticles => {
      if (fetchedArticles.length === 0) {
        this.notificationService.addNotification('There is no more articles');
        this.isEmpty = true;
        this.isLoading = false;
      } else {
        this.articles.push(...fetchedArticles);
        this.from += fetchedArticles.length;
        this.isLoading = false;
        this.isEmpty = false;
      }
    });
    this.onLoadMoreArticleButtonClick();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLoadMoreArticleButtonClick() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.blogService.getArticles(this.from, this.count);
  }

  onLoadOnScroll() {
    if(this.isEmpty) return
    else this.onLoadMoreArticleButtonClick();
  }

}
