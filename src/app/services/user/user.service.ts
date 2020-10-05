import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http : HttpClient) { }

  dataArtis(): Observable<User>{
    return this._http.get(environment.baseUrl +'/user/list')
    .pipe(map(data => <User> data));
  }

  dataUserName(): Observable<User[]>{
    return this._http.get(environment.baseUrl +'/user/username')
    .pipe(map(data => <User[]> data));
  }

  dataPassword(): Observable<User[]>{
    return this._http.get(environment.baseUrl +'/user/userpassword')
    .pipe(map(data => <User[]> data));
  }

}
