///<reference path="../../../../node_modules/@angular/http/src/http.d.ts"/>
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { InsuranceRequest } from './insurance.model';

@Injectable()
export class InsuranceService {

  constructor(private http: Http) { }

  list (startIndex: number, pageSize: number) {
      let params: URLSearchParams = new URLSearchParams();
      params.set('offset', startIndex.toString());
      params.set('max', pageSize.toString());
      params.set('sort', 'contactName');
      params.set('order', 'desc');

      return this.http.get ('/api/insurancerequest', {search: params})
          .map((response:Response) => response.json());
  }

  edit (id: number) {
      return this.http.get ('/api/insurancerequest/' + id)
                .map((response:Response) => response.json());
  }

  save (insuranceRequest: InsuranceRequest) {
    let isNew: boolean = insuranceRequest.id == null;
    if(isNew)
    return this.http.post('/api/insurancerequest', insuranceRequest, null)
      .map((response:Response) => response.json());
    else
      return this.http.put('/api/insurancerequest/'+ insuranceRequest.id, insuranceRequest,null)
        .map((response:Response) => response.json());
  }
}

