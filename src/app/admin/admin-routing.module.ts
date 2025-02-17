import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminArticleListComponent } from "./admin-article-list/admin-article-list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: AdminArticleListComponent,
            },
        ],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AdminRoutingModule {

}