import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class InsuranceService {

  constructor(private http: Http) { }

  list () {
      this.http.get ('/api/insurance', );
  }

}

export class InsuranceRequest {
  contactName: string;
  contactEmail: string;
}

