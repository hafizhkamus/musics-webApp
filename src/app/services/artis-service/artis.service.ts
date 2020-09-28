import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Artis } from './artis';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { DatatablesRequest } from '../datatables/datatables-request';
import { DatatablesResponse } from '../datatables/datatables-response';

@Injectable({
  providedIn: 'root'
})
export class ArtisService {

  constructor(private _http : HttpClient) { }

  insertArtis(artis: Artis): Observable<any>{
    return this._http.post(environment.baseUrl +'/artis/save', artis)
    .pipe(map(data => data));
  }

  deleteArtis(id): Observable<any>{
    return this._http.delete(environment.baseUrl +'/artis/delete'+ id)
    .pipe(map(data => data));
  }

  dataArtis(): Observable<Artis[]>{
    return this._http.get(environment.baseUrl +'/artis/list-artis')
    .pipe(map(data => <Artis[]> data));
  }

  dataArtisById(id): Observable<Artis>{
    return this._http.get(environment.baseUrl +'/artis/artis/'+id)
    .pipe(map(data => data as Artis));
  }

  getAllArtis(parameter: Map<string, any>, datatableParameters: any): Observable<DatatablesResponse>{
    const param = new DatatablesRequest();
    param.draw = datatableParameters.draw;
    param.length = datatableParameters.length;
    param.start = datatableParameters.start;
    param.sortCol = datatableParameters.order[0].column;
    param.sortDir = datatableParameters.order[0].dir;
    param.extraParam = {};
    parameter.forEach((value, key) =>{
      param.extraParam[key]= value ;
    });
    return this._http.post(environment.baseUrl +'/artis/datatable', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  upload(file : File): Observable<HttpEvent<any>>{
    const formData : FormData= new FormData()
    
    const req = new HttpRequest( 'POST', environment.baseUrl + '/artis/filesupload', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._http.request(req);
  }

}
