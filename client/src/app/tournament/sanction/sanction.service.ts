import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {logger} from "codelyzer/util/logger";

@Injectable()
export class SanctionService {

  constructor(private http: Http) { }

  list (startIndex: number, pageSize: number) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('offset', startIndex.toString());
    params.set('max', pageSize.toString());
    params.set('sort', 'tournamentName');
    params.set('order', 'desc');

    return this.http.get ('/api/sanctionrequest', {search: params})
      .map((response:Response) => response.json());
  }

  edit (id: number) {
    return this.http.get ('/api/sanctionrequest/' + id)
      .map((response:Response) => response.json());
  }

}
