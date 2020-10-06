import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService : AuthService, private router : Router) { }

  canActivate(
    next : ActivatedRouteSnapshot,
    state : RouterStateSnapshot
  ): boolean {
    const allowedRole = next.data.allowedRole;
    console.log(allowedRole);
    console.log(this.authService.isAuthenticated(allowedRole));
    const isCorrect = this.authService.isAuthenticated(allowedRole);
    // if(isCorrect){
    //   return true;
    // } else {
    //   this.router.navigate(["/login"]);
    // }

    return true;
  }
}
