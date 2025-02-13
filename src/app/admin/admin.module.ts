import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { AdminArticleListComponent } from "./admin-article-list/admin-article-list.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
    declarations: [AdminComponent, AdminArticleListComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule
    ],
})

export class AdminModule{}