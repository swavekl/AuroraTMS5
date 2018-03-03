import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { FinancialTransaction } from './financial-transaction.model'

@Injectable()
export class FinancialTransactionService {

  serviceURL: string = '/api/financialtransaction';

  constructor(private http: Http) { }

  perform (financialTransaction: FinancialTransaction) {
      return this.http.post (this.serviceURL, financialTransaction, null)
        .map((response:Response) => response.json());
  }
}
