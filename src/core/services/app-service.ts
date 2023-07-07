import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Feature } from '../models/feature';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  addModel(name: string, value: string) {
    let feature = new Feature(environment.applicationId, name, value);
    return this.http.post(environment.cm + '/api/Model', feature);
  }

  updateModel(value: any) {
    return this.http.patch(environment.cm + '/api/Model', value);
  }

  getModel(name: string) {
    return this.http.get(
      environment.cm +
        '/api/Model/GetAllModels?ApplicationId=' +
        environment.applicationId +
        '&Name=' +
        name
    );
  }
}
