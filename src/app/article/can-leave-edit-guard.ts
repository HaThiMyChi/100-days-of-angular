import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckDeactivate } from '../check-deactivate';

@Injectable({
  providedIn: 'root'
})
export class CanLeaveEditGuard implements CanDeactivate<CheckDeactivate> {
  canDeactivate(component: CheckDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }
}
