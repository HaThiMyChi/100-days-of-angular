import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInReactiveformComponent } from './sign-in-reactiveform/sign-in-reactiveform.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ExampleContainerComponent } from './example-container/example-container.component';

// RouterModule mặc định sẽ provide hai method là forRoot và forChild. Hai method này đều dùng để config routes, tuy nhiên.

// forRoot, dc gọi một lần duy nhất khi bạn config route trong AppRoutingModule. forRoot cũng dùng để configures/initializes router.
// forChild, dc gọi trong các module khác để config routes.

// Thay vì path: 'detail', giờ mình sửa lại thành path: ':slug'. Dấu hai chấm là cú pháp của router cho phép bạn định nghĩa ra một parameter trên URL. Phần sau dấu hai chấm là tên của parameter mà bạn có thể lấy được từ trong ArticleDetailComponent

const routes: Routes = [
  // {
  //   path: ':slug',
  //   component: ArticleDetailComponent,
  // },
  // {
  //   path:'',
  //   component:ArticleListComponent
  // },

  // config để load admin module theo cú pháp của lazy loading module khi mở ứng dụng ở path có dạng /admin
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule), // tức là một function có return lại một dynamic import module.
  },
  {
    path: '',
    redirectTo: 'article',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-in-rf',
    component: SignInReactiveformComponent
  },
  {
    path: 'registerFrom',
    component: RegisterFormComponent
  },
  {
    path: 'dynamic-component',
    component: ExampleContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
