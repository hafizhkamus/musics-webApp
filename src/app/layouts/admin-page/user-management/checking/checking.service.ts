import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Akun } from '../../../../services/user-management/akun';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CheckingService {

  constructor(private _http : HttpClient) { }

  checkingSuperAdmin(idUser : string): boolean{
    let isChecked = false;
    if(idUser != null){
      this._http.post(environment.baseUrl + '/user-info/checking-sa', idUser
      ).pipe(map(data => data as boolean)).subscribe(data => {
       if(data = true){
        isChecked = data;
        console.log(isChecked);
        return isChecked;
       }
      });
    } else{
      isChecked = false;
    }
    return isChecked;
  }
  
}
