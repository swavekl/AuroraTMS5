import { Action} from '@ngrx/store';
import { Account } from './../account.model'

export const SYSTEM            = '[Account] System';
export const SYSTEM_SUCCESS    = '[Account] System Success';
export const SYSTEM_FAILURE    = '[Account] System Failure';

export class AccountSystemAction implements Action {
  readonly type = SYSTEM;
  constructor () { }
}

export class AccountSystemSuccessAction implements Action {
  readonly type = SYSTEM_SUCCESS;
  constructor (public payload: any) { }
}

export class AccountSystemFailureAction implements Action {
  readonly type = SYSTEM_FAILURE;
  constructor (public payload: any) {  }
}

export type All
  =  AccountSystemAction
   | AccountSystemSuccessAction
   | AccountSystemFailureAction
  ;
