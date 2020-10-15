import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Akun } from '../../../../services/user-management/akun';
import { data } from 'jquery';
import { GroupUser } from './group-user';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class CheckingService {

  constructor(private _http : HttpClient) { }

  checkingSuperAdmin(idUser : string): Observable<GroupUser>{
    if(idUser != null){
      return this._http.post(environment.baseUrl + '/user-info/checking-sa', idUser
      ).pipe(map( data => data as GroupUser));
    } else{
      swal("Checking cannot service", "be patient on your code", "error");
    }
  }
  
}
