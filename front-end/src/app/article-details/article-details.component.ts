import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleDetailsComponent implements OnInit {

  styles: {};

  @Input() article;

  setCurrentStyle() {
    this.styles = {
      "loved": {
        "color": this.article.isLoved ? "red" : "gray",
      }
    }
  }

  constructor() { }

  ngOnInit() {
    this.setCurrentStyle();
  }

  toggleLove() {
    this.article.isLoved = !this.article.isLoved;
    this.setCurrentStyle();
  }

}
