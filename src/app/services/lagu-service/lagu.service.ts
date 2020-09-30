import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Lagu } from './lagu';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DatatablesResponse } from '../datatables/datatables-response';
import { DatatablesRequest } from '../datatables/datatables-request';

@Injectable({
  providedIn: 'root'
})
export class LaguService {

  constructor(private _http : HttpClient) { }

  insertLagu(lagu: Lagu): Observable<any>{
    return this._http.post(environment.baseUrl +'/lagu/save', Lagu)
    .pipe(map(data => data));
  }

  dataLaguByArtis(idArtis): Observable<Lagu[]>{
    return this._http.get(environment.baseUrl +'/lagu/list-lagu/artis/'+ idArtis)
    .pipe(map(data => data as Lagu[]));
  }

  dataLagusByGenre(idGenre): Observable<Lagu[]>{
    return this._http.get(environment.baseUrl +'/lagu/list-lagu/genre/'+ idGenre)
    .pipe(map(data => data as Lagu[]));
  }

  dataLagusByAlbums(idAlbum): Observable<Lagu[]>{
    return this._http.get(environment.baseUrl +'/lagu/list-lagu/albums/'+ idAlbum)
    .pipe(map(data => data as Lagu[]));
  }

  deleteLagu(id): Observable<any>{
    return this._http.delete(environment.baseUrl +'/lagu/delete'+ id)
    .pipe(map(data => data));
  }

  dataLagu(): Observable<Lagu[]>{
    return this._http.get(environment.baseUrl +'/lagu/list-lagu')
    .pipe(map(data => <Lagu[]> data));
  }

  dataLaguById(id): Observable<Lagu>{
    return this._http.get(environment.baseUrl +'/lagu/'+id)
    .pipe(map(data => data as Lagu));
  }

  getAllLagu(parameter: Map<string, any>, datatableParameters: any): Observable<DatatablesResponse>{
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
    return this._http.post(environment.baseUrl +'/lagu/datatable', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  upload(file : File): Observable<HttpEvent<any>>{
    const formData : FormData= new FormData()
    
    const req = new HttpRequest( 'POST', environment.baseUrl + '/lagu/filesupload', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._http.request(req);
  }
}
