import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {logger} from "codelyzer/util/logger";

@Injectable()
export class ConfigureTournamentService {

  constructor(private http: Http) { }

  list () {
    return this.http.get('/api/configuretournament')
    .map((response:Response) => response.json());
  }

  search (searchTerms) {
    return this.http.get('/api/configuretournament', JSON.stringify({ search: searchTerms }))
          .map((response:Response) => response.json());
  }
}
