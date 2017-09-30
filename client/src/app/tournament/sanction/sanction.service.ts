import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {logger} from "codelyzer/util/logger";

@Injectable()
export class SanctionService {

  constructor(private http: Http) { }

  list () {
    return this.http.get('/api/sanctionrequest').map((response:Response) => response.json());
  }

}

export class SanctionRequest {
  tournamentName: string;
  startDate: string;
  endDate: string;
}
