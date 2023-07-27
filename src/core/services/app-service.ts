import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Feature } from '../models/feature';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class AppService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(private http: HttpClient) {
    this.httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    this.httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
  }

  addModel(name: string, value: string) {
    const feature = new Feature(environment.applicationId, name, value);
    return this.http.post(environment.cm + '/api/Model', feature);
  }

  updateModel(value: any) {
    return this.http.patch(environment.cm + '/api/Model', value);
  }

  getModel(name: string) {
    debugger
    return this.http.get(
      environment.cm +
        '/api/Model/GetAllModels?ApplicationId=' +
        environment.applicationId +
        '&Name=' +
        name,
        this.httpOptions
    );
  }
}
