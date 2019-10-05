import { Injectable, NgModule } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISArticle } from 'shared';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public subjectAtricle = new Subject<ISArticle>();

  constructor(private http: HttpClient, private router: Router) { }

  public getArticleById(id: string) {
    const url = ["http://localhost:3000/api/article", id].join('/');
    this.http.get(url, {observe: "response"}).subscribe(resp => {
      console.log(resp);
      if(resp.status === 0) {
        this.subjectAtricle.next(undefined);
      }
      if(resp.status === 200) {
        this.subjectAtricle.next(resp.body);
      }
    })
  }

  public getArticleByUser(username: string) {

  }

  public getArticles(form: number, count: number) {

  }

  public getArticlesByCategories(categories: string[]) {

  }

  public creatArticle(article: ISArticle) {
    this.http.post("http://localhost:3000/api/article/creat", article, {observe: "response"}).subscribe(resp => {
      if(resp.status === 201) {
        console.log(resp.body)
        this.router.navigateByUrl(["blog", (<any>resp.body).id].join('/'));
      }
    })
  }

}
