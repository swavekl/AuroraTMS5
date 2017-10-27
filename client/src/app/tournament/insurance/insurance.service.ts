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
}

