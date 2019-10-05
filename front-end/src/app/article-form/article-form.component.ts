import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  constructor(public globals: Globals, private blogService: BlogService) { }

  ngOnInit() {
  }

  submitArticle(article) {
    this.blogService.creatArticle(article);
  }

}
