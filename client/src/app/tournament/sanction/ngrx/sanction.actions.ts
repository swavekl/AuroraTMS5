import { Action} from '@ngrx/store';
import { SanctionRequest } from './../sanction.model';
import { PagingInfo } from './../../../utils/paging-info';

export const SEARCH         = '[SanctionRequest] Search';
export const SEARCH_SUCCESS = '[SanctionRequest] Search Success';
export const ADD            = '[SanctionRequest] Add';
export const EDIT           = '[SanctionRequest] Edit';
export const DUPLICATE      = '[SanctionRequest] Duplicate';
export const EDIT_SUCCESS   = '[SanctionRequest] Edit Success';
export const EDIT_FAILED    = '[SanctionRequest] Edit Failed';
export const SAVE           = '[SanctionRequest] Save';
export const SAVE_SUCCESS   = '[SanctionRequest] Save Success';
export const SAVE_FAILURE   = '[SanctionRequest] Save Failure';

export class SanctionRequestSearchAction implements Action {
  readonly type = SEARCH;

  constructor (public payload: PagingInfo) { }
}

export class SanctionRequestSearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor (public payload: SanctionRequest [], public count: number) { }
}

 export class SanctionRequestAddAction implements Action {
   readonly type = ADD;

   constructor () { }
 }

 export class SanctionRequestEditAction implements Action {
   readonly type = EDIT;

   constructor (public payload: number) {
   }
 }

 export class SanctionRequestDuplicateAction implements Action {
   readonly type = DUPLICATE;

   constructor (public payload: number) {
   }
 }

 export class SanctionRequestEditSuccessAction implements Action {
   readonly type = EDIT_SUCCESS;

   constructor (public payload: SanctionRequest) {
   }
 }

 export class SanctionRequestEditFailedAction implements Action {
   readonly type = EDIT_FAILED;

   constructor (public payload: any) {  }
 }

export class SanctionRequestSaveAction implements Action {
  readonly type = SAVE;

  constructor (public payload: SanctionRequest) {  }
}

export class SanctionRequestSaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor () { }
}

export class SanctionRequestSaveFailedAction implements Action {
  readonly type = SAVE_FAILURE;

  constructor (public payload: any) {  }
}

export type All
  = SanctionRequestSearchAction
   | SanctionRequestSearchSuccessAction
   | SanctionRequestAddAction
   | SanctionRequestEditAction
   | SanctionRequestDuplicateAction
   | SanctionRequestEditSuccessAction
   | SanctionRequestEditFailedAction
   | SanctionRequestSaveAction
   | SanctionRequestSaveSuccessAction
   | SanctionRequestSaveFailedAction
  ;
