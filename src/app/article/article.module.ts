import { RouterModule, Routes } from "@angular/router";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { CanEditArticleGuard } from "./can-edit-article.guard";
import { CanLeaveEditGuard } from "./can-leave-edit-guard";

// const routes: Routes = [
//     {
//         path: 'article',
//         component: ArticleListComponent
//     },
//     {
//     path: 'article/:slug',
//     component: ArticleDetailComponent
//     }
// ];

 // cach 2 child routes
 const routes: Routes = [
    {
        path: 'article',
        children: [
            {
                path: '',
                component: ArticleListComponent,
            },
            {
                path: ':slug',
                component: ArticleDetailComponent,
            },
            {
                path: ':slug/edit',
                component: ArticleEditComponent,
                canActivate: [CanEditArticleGuard],
                canDeactivate: [CanLeaveEditGuard]
            }
           
        ],
        
    },
]
// cach 3: Ngoài ra, parent route có thể activate một component, chúng ta thường gọi nó là layout component. Trong component này nhất định phải có chứa router-outlet, nó sẽ là điểm đánh dấu để activate các child component.
// const routes: Routes = [
//     {
//       path: 'article',
//       component: ArticleComponent, // <== this component can be called `Layout component`
//       children: [
//         {
//           path: '',
//           component: ArticleListComponent,
//         },
//         {
//           path: ':slug',
//           component: ArticleDetailComponent,
//         },
//       ],
//     },
// ];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
    ],
    declarations: [ArticleListComponent, ArticleDetailComponent, ArticleEditComponent]
  })
export class ArticleModule { }