import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { LablesRekaman } from './lables-rekaman';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DatatablesResponse } from '../datatables/datatables-response';
import { DatatablesRequest } from '../datatables/datatables-request';

@Injectable({
  providedIn: 'root'
})
export class LablesRekamanService {

  constructor(private _http : HttpClient) { }


  insertLabels(lablesRekaman: LablesRekaman): Observable<any>{
    return this._http.post(environment.baseUrl +'/labels-rekaman/save', lablesRekaman)
    .pipe(map(data => data));
  }

  deleteLabels(id): Observable<any>{
    return this._http.delete(environment.baseUrl +'/labels-rekaman/delete'+ id)
    .pipe(map(data => data));
  }

  dataLabels(): Observable<LablesRekaman[]>{
    return this._http.get(environment.baseUrl +'/labels-rekaman/list-labels')
    .pipe(map(data => <LablesRekaman[]> data));
  }

  dataLabelsById(id): Observable<LablesRekaman>{
    return this._http.get(environment.baseUrl +'/labels-rekaman/label/'+id)
    .pipe(map(data => data as LablesRekaman));
  }

  getAllLabels(parameter: Map<string, any>, datatableParameters: any): Observable<DatatablesResponse>{
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
    return this._http.post(environment.baseUrl +'/labels-rekaman/datatable', param)
    .pipe(map(data => data as DatatablesResponse));
  }
  
}
