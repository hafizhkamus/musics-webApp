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
    route : ActivatedRouteSnapshot,
    state : RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isCorrect = this.authService.isAuthentic();
    // if(isCorrect){
    //   return true;
    // } else {
    //   this.router.navigate(["/login"]);
    // }

    return isCorrect;
  }
}
