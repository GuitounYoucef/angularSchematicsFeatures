import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard /* implements CanDeactivate<My-Component>  */{
   canDeactivate(/* component: My-Component, */ 
                 currentRoute:ActivatedRouteSnapshot,
                 currentState: RouterStateSnapshot,
                 nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
  {
/*     if (!component.saved)
    {
     return confirm("");
    }  */
    return true;
   }


  
  
}
