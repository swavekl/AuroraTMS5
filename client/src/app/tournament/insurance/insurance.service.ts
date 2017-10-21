import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { InsuranceRequest } from './insurance.model';


@Injectable()
export class InsuranceService {

  constructor(private http: Http) { }

  list () {
      return this.http.get ('/api/insurancerequest').map((response:Response) => response.json());
  }

}

