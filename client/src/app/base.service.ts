import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BaseService {

  // baseUrl: string = 'http://gateway-pc:8080';
  baseUrl: string = 'http://gateway-pc:9001';

  constructor() {
  }

  getBaseUrl () {
    return this.baseUrl;
  }

}
