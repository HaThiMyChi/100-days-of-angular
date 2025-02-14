import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "../user.service";
import { ArticleService } from "./article.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class CanEditArticleGuard implements CanActivate {
    constructor(private userService: UserService, private articleService:ArticleService) {

    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const slug = next.paramMap.get('slug');
        if (!slug) {
            return false;
        }
        return this.articleService
            .getArticleBySlug(slug)
            .pipe(
                map(
                (article) => article.author === this.userService.currentUser.username
                )
            );
     }
}