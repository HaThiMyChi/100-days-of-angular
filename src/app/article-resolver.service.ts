import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Article } from "./model/article";
import { ArticleService } from "./article/article.service";
import { Observable, of, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ArticleResolver implements Resolve<Article> {
    constructor(private articleService: ArticleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> | Promise<Article> | Article {
        const slug = route.paramMap.get('slug');
        if (slug) {
            return this.articleService.getArticleBySlug(slug);
        } else {
            console.log('call api error!');
            return throwError(() => new Error('Slug is null'));
        }
        
    }

}