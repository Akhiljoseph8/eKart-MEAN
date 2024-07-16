import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const api=inject(ApiService)
  const router=inject(Router)
  const toastr=inject(ToastrService)
  if(api.isLoggedIn()){
  return true;
  }else {
    toastr.warning("Please Login First")
    router.navigateByUrl('/log')
    return false;
  }

};
