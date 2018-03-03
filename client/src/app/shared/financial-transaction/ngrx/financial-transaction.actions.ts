import { Action} from '@ngrx/store';
import { FinancialTransaction } from './../financial-transaction.model'

export const RESET          = '[FinancialTransaction] Reset';
export const PAY            = '[FinancialTransaction] Pay';
export const PAY_SUCCESS    = '[FinancialTransaction] Pay Success';
export const PAY_FAILURE    = '[FinancialTransaction] Pay Failure';

export class FinancialTransactionResetAction implements Action {
  readonly type = RESET;
  constructor (public payload: any) { }
}

export class FinancialTransactionAction implements Action {
  readonly type = PAY;
  constructor (public payload: FinancialTransaction) { }
}

export class FinancialTransactionSuccessAction implements Action {
  readonly type = PAY_SUCCESS;
  constructor (public payload: any) { }
}

export class FinancialTransactionFailureAction implements Action {
  readonly type = PAY_FAILURE;
  constructor (public payload: any) {  }
}

export type All
  = FinancialTransactionResetAction
   | FinancialTransactionAction
   | FinancialTransactionSuccessAction
   | FinancialTransactionFailureAction
  ;
