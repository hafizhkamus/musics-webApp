import { Injectable } from '@angular/core';
import { Albums } from './albums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { DatatablesRequest } from '../datatables/datatables-request';
import { DatatablesResponse } from '../datatables/datatables-response';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor( private _http : HttpClient) { }

  insertAlbums(albums: Albums): Observable<any>{
    return this._http.post(environment.baseUrl +'/albums/save', Albums)
    .pipe(map(data => data));
  }

  dataAlbumsByArtis(idArtis): Observable<Albums[]>{
    return this._http.get(environment.baseUrl +'/albums/list-albums/artis/'+ idArtis)
    .pipe(map(data => data as Albums[]));
  }

  dataAlbumsByLabels(idLabel): Observable<Albums[]>{
    return this._http.get(environment.baseUrl +'/list-albums/labels/'+ idLabel)
    .pipe(map(data => data as Albums[]));
  }

  deleteAlbums(id): Observable<any>{
    return this._http.delete(environment.baseUrl +'/albums/delete'+ id)
    .pipe(map(data => data));
  }

  dataAlbums(): Observable<Albums[]>{
    return this._http.get(environment.baseUrl +'/albums/list-albums')
    .pipe(map(data => <Albums[]> data));
  }

  dataAlbumsById(id): Observable<Albums>{
    return this._http.get(environment.baseUrl +'/albums/albums/'+id)
    .pipe(map(data => data as Albums));
  }

  getAllAlbums(parameter: Map<string, any>, datatableParameters: any): Observable<DatatablesResponse>{
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
    return this._http.post(environment.baseUrl +'/albums/datatable', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  upload(file : File): Observable<HttpEvent<any>>{
    const formData : FormData= new FormData()
    
    const req = new HttpRequest( 'POST', environment.baseUrl + '/albums/filesupload', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._http.request(req);
  }

}
