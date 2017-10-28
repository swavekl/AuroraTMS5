import { Action} from '@ngrx/store';
import { SanctionRequest } from './sanction.model'
import {PagingInfo} from "../insurance/insurance.actions";

export const SANCTION_SEARCH         = '[SanctionRequest] Search';
export const SANCTION_SEARCH_SUCCESS = '[SanctionRequest] Search Success';
// export const SANCTION_ADD            = '[SanctionRequest] Add';
// export const SANCTION_EDIT           = '[SanctionRequest] Edit';
// export const SANCTION_DUPLICATE      = '[SanctionRequest] Duplicate';
// export const SANCTION_EDIT_SUCCESS   = '[SanctionRequest] Edit Success';
// export const SANCTION_EDIT_FAILED    = '[SanctionRequest] Edit Failed';

export class SanctionRequestSearchAction implements Action {
  readonly type = SANCTION_SEARCH;

  constructor (public payload: PagingInfo) { }
}

export class SanctionRequestSearchSuccessAction implements Action {
  readonly type = SANCTION_SEARCH_SUCCESS;
  constructor (public payload: SanctionRequest [], public count: number) { }
}

// export class SanctionRequestAddAction implements Action {
//   readonly type = SANCTION_ADD;
//
//   constructor () { }
// }
//
// export class SanctionRequestEditAction implements Action {
//   readonly type = SANCTION_EDIT;
//
//   constructor (public payload: number) {
//   }
// }
//
// export class SanctionRequestDuplicateAction implements Action {
//   readonly type = SANCTION_DUPLICATE;
//
//   constructor (public payload: number) {
//   }
// }
//
// export class SanctionRequestEditSuccessAction implements Action {
//   readonly type = SANCTION_EDIT_SUCCESS;
//
//   constructor (public payload: SanctionRequest) {
//   }
// }
//
// export class SanctionRequestEditFailedAction implements Action {
//   readonly type = SANCTION_EDIT_FAILED;
//
//   constructor (public payload: any) {  }
// }

export type All
  = SanctionRequestSearchAction
  | SanctionRequestSearchSuccessAction
  // | SanctionRequestAddAction
  // | SanctionRequestEditAction
  // | SanctionRequestDuplicateAction
  // | SanctionRequestEditSuccessAction
  // | SanctionRequestEditFailedAction
  ;
