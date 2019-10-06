import { Component, OnInit, Input } from '@angular/core';
import { ISArticle } from 'shared';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {

  @Input() article: ISArticle;

  constructor() { }

  ngOnInit() {
  }


}
