import { inject } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';


import { LocalSorageService } from '../Services/localSrorage/LocalStorage.service';


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const localSorageService = inject(LocalSorageService);
  const router = inject(Router);
  let b=localSorageService.getToken();
  if (b)
    {    
      return true; 
    }
    else
    {
    router.navigate(['auth/login']);
    }
    return false;

};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => authGuard(route, state);