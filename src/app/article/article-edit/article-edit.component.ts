import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CheckDeactivate } from 'src/app/check-deactivate';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit, CheckDeactivate {

  constructor(private activateRoute: ActivatedRoute, private dialog: MatDialog) { }
  slug$ = this.activateRoute.paramMap.pipe(
    map(params => params.get('slug'))
  );

  isEditing = false;

  ngOnInit(): void {
  }

  openDialog() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you want to leave this page?'
      }
    });
    return ref.afterClosed();
  }

  checkDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.isEditing || this.openDialog();
  }

}
