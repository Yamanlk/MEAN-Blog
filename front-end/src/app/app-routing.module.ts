import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {ArticleFormComponent} from "./article-form/article-form.component"
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: BlogComponent},
  {path: 'blog/creat', component: ArticleFormComponent},
  {path: 'blog/:articleId', component: ArticleComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: "user/:id", component: UserComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]  
})
export class AppRoutingModule { }
