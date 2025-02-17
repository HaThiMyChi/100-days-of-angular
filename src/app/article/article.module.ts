import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component'
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ArticleRoutingModule
  ],
  declarations: [ArticleComponent, ArticleListComponent, ArticleDetailComponent, ArticleEditComponent]
})
export class ArticleModule { }