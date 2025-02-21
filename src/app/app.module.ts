import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { ToggleComponent } from './toggle/toggle.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabBsGroupComponent } from './tab-group/tab-bs-group.component';
import { CounterComponent } from './counter/counter.component';
import { TabContentDirective } from './tab-panel/tab-content.directive';
import { Day018PipesComponent } from './day018-pipes/day018-pipes.component';
import { FormatAddressPipe } from './day018-pipes/format-address.pipe';
import { AdultPipe } from './day018-pipes/adult.pipe';
import { TransformationOperationsRxjsComponent } from './transformation-operations-rxjs/transformation-operations-rxjs.component';
import { FilteringOperationsRxjsComponent } from './filtering-operations-rxjs/filtering-operations-rxjs.component';
import { HigherOrderObservablesComponent } from './higher-order-observables/higher-order-observables.component';
import { ExampleHigherOrderObservablesComponent } from './example-higher-order-observables/example-higher-order-observables.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HelloObservablesComponent } from './hello-observables/hello-observables.component';
import { Day026RxjsSubjectMulticastComponent } from './day026-rxjs-subject-multicast/day026-rxjs-subject-multicast.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleModule } from './article/article.module';
import { AdminArticleListComponent } from './admin/admin-article-list/admin-article-list.component';
import { AdminComponent } from './admin/admin.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './sign-in/sign-in.component'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { SignInReactiveformComponent } from './sign-in-reactiveform/sign-in-reactiveform.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ExampleContainerComponent } from './example-container/example-container.component';
// import { DynamicContentOneComponent } from './dynamic-content-one/dynamic-content-one.component';
// import { DynamicContentTwoComponent } from './dynamic-content-two/dynamic-content-two.component';
@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    ProgressBarComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    ToggleComponent,
    TabGroupComponent,
    TabPanelComponent,
    TabBsGroupComponent,
    CounterComponent,
    TabContentDirective,
    Day018PipesComponent,
    FormatAddressPipe,
    AdultPipe,
    TransformationOperationsRxjsComponent,
    FilteringOperationsRxjsComponent,
    HigherOrderObservablesComponent,
    ExampleHigherOrderObservablesComponent,
    HelloObservablesComponent,
    Day026RxjsSubjectMulticastComponent,
    SignInComponent,
    SignInReactiveformComponent,
    RegisterFormComponent,
    ExampleContainerComponent,
    // DynamicContentOneComponent,
    // DynamicContentTwoComponent,
    // ConfirmDialogComponent,
    // AdminArticleListComponent,
    // AdminComponent,
    // ArticleListComponent,
    // ArticleDetailComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ConfirmDialogModule,
    ArticleModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  // entryComponents: [DynamicContentOneComponent, DynamicContentTwoComponent]
})
export class AppModule { }
