import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { logger } from "codelyzer/util/logger";
import { Club } from './club.model';

@Injectable()
export class ClubsService {

  serviceURL: string = '/api/club';

  constructor(private http: Http) { }

  list (startIndex: number, pageSize: number, searchTerms: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('offset', startIndex.toString());
    params.set('max', pageSize.toString());
    params.set('sort', 'name');
    params.set('order', 'desc');
    if (searchTerms != null && searchTerms != "") {
      params.set('searchTerms', searchTerms);
      return this.http.get (this.serviceURL + '/search', {search: params})
        .map((response:Response) => {
        //console.log ('response from search is ', response);
        return response.json();} );
    } else {
      return this.http.get (this.serviceURL, {search: params})
        .map((response:Response) => response.json());
    }
  }

  edit (id: number) {
    return this.http.get (this.serviceURL + '/' + id)
      .map((response:Response) => response.json());
  }

  save (club: Club) {
    let isNew: boolean = club.id == null;
    if(isNew)
      return this.http.post(this.serviceURL, club, null)
        .map((response:Response) => { console.log ('response from save is ', response);
        return response.json()});
    else
      return this.http.put(this.serviceURL+ '/'+ club.id, club, null)
        .map((response:Response) => response.json());
  }
}
