import { Injectable } from '@angular/core';
import { Akun } from './akun';
import { Roles } from './roles';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private _http : HttpClient) { }

  dataAkun(): Observable<Akun[]>{
    return this._http.get(environment.baseUrl +'/register/all')
    .pipe(map(data => <Akun[]> data));
  }

  dataRoles(): Observable<Roles[]>{
    return this._http.get(environment.baseUrl +'/register/allRole')
    .pipe(map(data => <Roles[]> data));
  }


}
