import { Injectable } from '@angular/core';
import { Genre } from './genre';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { DatatablesRequest } from '../datatables/datatables-request';
import { DatatablesResponse } from '../datatables/datatables-response';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private _http : HttpClient) { }

  insertGenre(Genre: Genre): Observable<any>{
    return this._http.post(environment.baseUrl +'/genre/save', Genre)
    .pipe(map(data => data));
  }

  dataGenre(): Observable<Genre[]>{
    return this._http.get(environment.baseUrl +'/genre/list-genre')
    .pipe(map(data => <Genre[]> data));
  }

  dataGenreById(id): Observable<Genre>{
    return this._http.get(environment.baseUrl +'/artis/'+id)
    .pipe(map(data => data as Genre));
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
    return this._http.post(environment.baseUrl +'/genre/datatable', param)
    .pipe(map(data => data as DatatablesResponse));
  }

}
