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
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
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
    ArticleListComponent,
    ArticleDetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
