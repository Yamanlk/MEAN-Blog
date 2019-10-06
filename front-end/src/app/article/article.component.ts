import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISArticle } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  article: ISArticle;
  isError: boolean;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    this.subscription = this.blogService.subjectArticle.subscribe(fetchedArticle => {
      if(fetchedArticle === undefined) this.isError = true;
      else 
      {
        this.isError = false;
        this.article = fetchedArticle
      };
    })
    this.route.paramMap.subscribe(params => {
      this.blogService.getArticleById(params.get("articleId"));
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
