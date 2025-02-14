import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CheckDeactivate } from '../check-deactivate';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CanLeaveEditGuard implements CanDeactivate<CheckDeactivate> {
    canDeactivate(component: CheckDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.checkDeactivate(currentRoute, currentState, nextState);
      }
}