import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let _router=inject(Router);
  if(authService.currentUser.getValue()!=null){
    return true;
  }
  else{
    _router.navigate(["/signin"]);
    return false;
  }

};
