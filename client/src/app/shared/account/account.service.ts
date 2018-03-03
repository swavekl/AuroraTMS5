import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Account } from './account.model'

@Injectable()
export class AccountService {

  serviceURL: string = '/api/account';

  constructor(private http: Http) { }

  getSystemAccount () {
      return this.http.get (this.serviceURL + '/system', null)
        .map((response:Response) => response.json());
  }

}
