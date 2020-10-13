import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  public saveAdmin(value : any){
    return this.http.post<any>(`${environment.baseUrl}/register/saveAdmin`, value, {observe : 'response'});
  }

  public saveUser(value : any){
    return this.http.post<any>(`${environment.baseUrl}/register/saveUser`, value, {observe : 'response'});
  }
}
