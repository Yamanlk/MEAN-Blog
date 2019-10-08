import { Injectable, NgModule } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { ISArticle } from 'shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public subjectArticle = new Subject<ISArticle>();
  public subjectArticles = new Subject<ISArticle[]>();

  constructor(private http: HttpClient, private router: Router) { }

  public getArticleById(id: string) {
    const url = ["http://localhost:3000/api/article", id].join('/');
    this.http.get(url, {observe: "response"}).subscribe(resp => {
      if(resp.status === 200) {
        this.subjectArticle.next(<ISArticle>resp.body);
      }
    },
    (error) => {
      this.subjectArticle.next(undefined);
    })
  }

  public getArticleByUser(username: string) {

  }

  public getArticles(from: number, count: number) {
    let paramsObj = {
      from: from.toString(),
      count: count.toString()
    }
    let params: HttpParams = new HttpParams({fromObject: paramsObj});
    const url = "http://localhost:3000/api/article";
    this.http.get(url, {observe: "response", params: params}).subscribe(resp => {
      if(resp.status === 200) {this.subjectArticles.next(<ISArticle[]>resp.body)}
    })
  }

  public getArticlesByCategories(categories: string[]) {

  }

  public creatArticle(article: ISArticle | any) {
    this.http.post("http://localhost:3000/api/article/creat", article, {observe: "response"}).subscribe(resp => {
      if(resp.status === 201) {
        this.router.navigateByUrl("/");
      }
    })
  }

}
