import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';


import { LocalSorageService } from '../Services/localSrorage/LocalStorage.service';
import { AuthViewModel } from '../../Auth/Auth.Presentation/Auth.ViewModels/AuthViewModel';
import { map } from 'rxjs';


export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authViewModel = inject(AuthViewModel);
  const router = inject(Router);
  return authViewModel.currentUser$.pipe(
    map(user => {
      if (user.role === "ROLE_ADMIN")
        return true;
      else {
        router.navigate(['main/']);
        return false;
      }
    }))


};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AdminGuard(route, state);
