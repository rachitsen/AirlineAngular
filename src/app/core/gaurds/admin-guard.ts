import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // not logged in
  if(!user || !user.role){
    router.navigateByUrl('/login');
    return false;
  }

  // not admin
  if(user.email !== 'admin@air.com'){
    alert("Access denied. Admin only.");
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true; // allow admin
};
