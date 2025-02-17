import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Article } from '../../model/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article$!: Observable<Article>;
  constructor(private _route: ActivatedRoute, private _api:ArticleService) { }

  ngOnInit(): void {
    // cach 1 dung theo ActivatedRoute
    // let slug = this._route.snapshot.paramMap.get('slug') || 'default-slug';
    // this.article$ = this._api.getArticleBySlug(slug);

    // Một trường hợp khác là khi bạn từ /article/bai-viet-1 navigate sang /article/bai-viet-2, 
    // lúc này chúng sẽ sử dụng cùng config, và do component ArticleDetailComponent đã được activated rồi, 
    // Angular Router sẽ không tạo lại nó nữa, mà reuse luôn. 
    // Lúc này snapshot không thay đổi, vì snapshot chỉ tạo một lần duy nhất khi tạo ArticleDetailComponent, còn paramMap Observable sẽ emit một giá trị mới cho slug.
    // cach 2:  sử dụng Observable để observe như sau

    // this.article$ = this._route.paramMap.pipe(
    //   map(params => params.get('slug')),
    //   switchMap(slug => {
    //     if (slug) {
    //       return this._api.getArticleBySlug(slug);
    //     } else {
    //       return EMPTY; // Ensure both paths return an observable
    //     }
    //   })
    // );

    // cach nay goi data theo cach su dung resolve o routing, data.article la do ten article duoc dinh nghia key o routing cho resolve
    this.article$ = this._route.data.pipe(map((data) => data.article));

    // Ngoài việc cung cấp API cho params, ActivatedRoute Service cũng cho phép bạn lấy/observe query params thông qua queryParamMap.

    // Ví dụ bạn vào một URL là tiepphan.com/page/2?sort=createdDate, thì bạn có thể lấy về sort query qua snapshot.queryParamMap.get('sort') hoặc

    // queryParamMap.subscribe((query) => {
    //   console.log(query.get('sort'));
    // });

    // Router Service
    // Service này cung cấp cho chúng ta các cách để thao tác với URL, hoặc có thể sử dụng để navigate trong component chẳng hạn.
    // Ví dụ: Bạn có một button, khi người dùng click vào đó sẽ thực hiện một số task, nếu thành công sẽ navigate về trang chủ chẳng hạn. Lúc này bạn có thể sử dụng 1 trong hai method sau để navigate.

    // class SomeComponent {
    //   constructor(private router: Router) {}
    //   onClick() {
    //     // do something
    //     this.router.navigate(['/article']);
    //   }
    // }
  }

}
