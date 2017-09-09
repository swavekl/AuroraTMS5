import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { BaseService } from './base.service';

@Injectable()
export class TodosService extends BaseService {

  baseServiceUrl: string;

  constructor(private http: Http) {
    super();
   }

   getServiceUrl() {
      return this.getBaseUrl() + "/todo";
   }

  getTodos(){
    return this.http.get(this.getServiceUrl()).map((response:Response) => response.json());
  }
}

export class Todo {
    title: string = '';
    complete: boolean = false;
}


