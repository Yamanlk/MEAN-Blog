import { Component, OnInit } from '@angular/core';
import { ISArticle } from 'shared';
import { BlogService } from '../blog.service';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-blog ',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles: ISArticle[] = []
  from=0;
  count = 5;
  isLoading: boolean = false;

  constructor(private blogService: BlogService, private notificationService: NotificationService) { }

  ngOnInit() {
      this.blogService.subjectArticles.subscribe(fetchedArticles => {
        if(fetchedArticles.length === 0) {
          this.notificationService.addNotification('There is no more articles');
          this.isLoading = false;
        } else {
          this.articles.push(...fetchedArticles);
          this.from += fetchedArticles.length;
          this.isLoading = false;
        }
      });
      this.blogService.getArticles(this.from, this.count);
  }

  onLoadMoreArticleButtonClick() {
    this.isLoading = true;
    this.blogService.getArticles(this.from, this.count);
  }

}
