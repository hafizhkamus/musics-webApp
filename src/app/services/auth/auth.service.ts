import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Status } from '../user/status';
import { User } from '../user/user';
import { Observable } from 'rxjs';

@Injectable()

export class AuthService {
    loggedIn = false;
    
    constructor(private router: Router, private httpKlien: HttpClient){

    }

    isLogin = false;
    private currentLogin = 'access_token'

    login(username: string, password: string): void{
      const userAdmin = new User();
      userAdmin.userName = username;
      userAdmin.userPassword = password;
      this.httpKlien.post(environment.baseUrl + '/auth/login', userAdmin
      ).pipe(map(data => data as Status))
      .subscribe( data => {
          this.isLogin = data.isValid;
          if(this.isLogin){
              localStorage.setItem('isLogin', 'Y');
              localStorage.setItem('token', data.token);
              localStorage.setItem('userName', username);
              this.router.navigate(['/home']);
          }
      });
    }

    isAuthenticated(allowedRoles: string[]): Observable<Status> {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      if(username != null && token != null) {
          console.log(allowedRoles);
          const userAdmin = new User();
          userAdmin.userName = username;
          userAdmin.tokenKey = token;
          return this.httpKlien.post(environment.baseUrl + '/auth/checking', userAdmin
          ).pipe(map( data => data as Status));
      } else {
          this.router.navigate(['login']);
      }
  }

  isAuthentic(): boolean{
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const isLogin = localStorage.getItem('isLogin');
    let statusLogin : boolean = false;
    const userAdmin = new User();
    userAdmin.userName = userName;
    userAdmin.tokenKey = token;
    if(token != null && userName != null && isLogin === 'Y'){
      statusLogin = true;
    }
      return statusLogin;
  }

    logout(){
      localStorage.removeItem('token');
      this.router.navigate(["/login"]);
    }

    // isAuthenticated() {
    //     const promise = new Promise(
    //         (resolve, rejects) => {
    //             setTimeout(() => {
    //                 resolve(this.loggedIn)
    //             }, 1000);
    //         }
    //     );
    //     return promise;
    // }
}