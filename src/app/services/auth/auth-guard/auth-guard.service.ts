import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService : AuthService, private router : Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
        const allowedRoles = next.data.allowedRoles;
        //console.log(this.authService.isAuthorized(allowedRoles));
        return this.authService.isAuthenticated(allowedRoles)
        .pipe(map(data => {
            if(data.roles != null && allowedRoles.some(r => data.roles.includes(r)) && data.isValid){
                return true;
            }else{
                this.router.navigate(['login'])
            }
        }))
    }
}
