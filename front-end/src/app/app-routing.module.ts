import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path: '', component: BlogComponent},
  {path: 'blog/:articleId', component: ArticleComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent},
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