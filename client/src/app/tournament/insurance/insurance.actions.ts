import { Action} from '@ngrx/store';
import { InsuranceRequest } from './insurance.model'

export const SEARCH         = '[InsuranceRequest] Search';
export const SEARCH_SUCCESS = '[InsuranceRequest] Search Success';
export const ADD            = '[InsuranceRequest] Add';
export const EDIT           = '[InsuranceRequest] Edit';
export const DUPLICATE      = '[InsuranceRequest] Duplicate';
export const EDIT_SUCCESS   = '[InsuranceRequest] Edit Success';
export const EDIT_FAILED    = '[InsuranceRequest] Edit Failed';

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

export class InsuranceRequestEditAction implements Action {
  readonly type = EDIT;

  constructor (public payload: number) {
  }
}

export class InsuranceRequestDuplicateAction implements Action {
  readonly type = DUPLICATE;

  constructor (public payload: number) {
  }
}

export class InsuranceRequestEditSuccessAction implements Action {
  readonly type = EDIT_SUCCESS;

  constructor (public payload: InsuranceRequest) {
  }
}

export class InsuranceRequestEditFailedAction implements Action {
  readonly type = EDIT_FAILED;

  constructor (public payload: any) {  }
}

export type All
  = InsuranceRequestSearchAction
  | InsuranceRequestSearchSuccessAction
  | InsuranceRequestAddAction
  | InsuranceRequestEditAction
  | InsuranceRequestDuplicateAction
  | InsuranceRequestEditSuccessAction
  | InsuranceRequestEditFailedAction
  ;

