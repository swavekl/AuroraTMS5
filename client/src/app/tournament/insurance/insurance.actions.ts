import { Action} from '@ngrx/store';
import { InsuranceRequest } from './insurance.model'

export const SEARCH         = '[InsuranceRequest] Search';
export const SEARCH_SUCCESS = '[InsuranceRequest] Search Success';

export class InsuranceRequestSearchAction implements Action {
  readonly type = SEARCH;

  constructor () { }
}

export class InsuranceRequestSearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor (public payload: InsuranceRequest []) { }
}

export type All
  = InsuranceRequestSearchAction
  | InsuranceRequestSearchSuccessAction;

