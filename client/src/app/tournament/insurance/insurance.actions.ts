import { Action} from '@ngrx/store';
import { InsuranceRequest } from './insurance.model'

export const SEARCH         = '[InsuranceRequest] Search';
export const SEARCH_SUCCESS = '[InsuranceRequest] Search Success';
export const ADD = '[InsuranceRequest] Add';

export class PagingInfo {
  constructor (public startIndex: number, public pageSize: number) {
  }
}

export class InsuranceRequestSearchAction implements Action {
  readonly type = SEARCH;

  constructor (public payload: PagingInfo) { }
}

export class InsuranceRequestSearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor (public payload: InsuranceRequest [], public count: number) { }
}

export class InsuranceRequestAddAction implements Action {
  readonly type = ADD;
  constructor () { }
}

export type All
  = InsuranceRequestSearchAction
  | InsuranceRequestSearchSuccessAction
  | InsuranceRequestAddAction;

