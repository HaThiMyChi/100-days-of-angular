import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { CanEditArticleGuard } from './can-edit-article.guard';
import { CanLeaveEditGuard } from './can-leave-edit-guard';

const routes: Routes = [
  {
    path: 'article',
    component: ArticleComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent,
      },
      {
        path: ':slug',
        component: ArticleDetailComponent
      },
      {
        path: ':slug/edit',
        component: ArticleEditComponent,
        canActivate: [CanEditArticleGuard],
        canDeactivate: [CanLeaveEditGuard]
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule],
})
export class ArticleRoutingModule { }