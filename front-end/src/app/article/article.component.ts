import { Component, OnInit } from '@angular/core';
import { ISArticle } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: ISArticle;
  isError: boolean;

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.subjectAtricle.subscribe(fetchedArticle => {
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
}
