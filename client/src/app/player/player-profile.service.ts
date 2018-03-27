import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { logger } from "codelyzer/util/logger";

import { PlayerProfile } from './player-profile.model'


@Injectable()
export class PlayerProfileService {

  serviceURL: string = '/api/playerprofile';

  constructor(private http: Http) { }

  list (startIndex: number, pageSize: number, searchTerms: string) {
    return this.http.get (this.serviceURL)
      .map ((response:Response) => response.json());
  }

  edit (id: number) {
    return this.http.get (this.serviceURL + '/' + id)
      .map((response:Response) => response.json());
  }

  save (playerProfile: PlayerProfile) {
    let isNew: boolean = playerProfile.id == null;
    if(isNew)
      return this.http.post(this.serviceURL, playerProfile, null)
        .map((response:Response) => response.json());
    else
      return this.http.put(this.serviceURL+ '/'+ playerProfile.id, playerProfile, null)
        .map((response:Response) => response.json());
  }


}
