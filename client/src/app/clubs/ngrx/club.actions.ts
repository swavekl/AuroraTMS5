import { Action} from '@ngrx/store';
import { Club } from './../club.model'
import { PagingInfo } from "./../../utils/paging-info";

export const SEARCH         = '[Club] Search';
export const SEARCH_SUCCESS = '[Club] Search Success';
export const ADD            = '[Club] Add';
export const EDIT           = '[Club] Edit';
export const DUPLICATE      = '[Club] Duplicate';
export const EDIT_SUCCESS   = '[Club] Edit Success';
export const EDIT_FAILED    = '[Club] Edit Failed';
export const SAVE           = '[Club] Save';
export const SAVE_SUCCESS   = '[Club] Save Success';
export const SAVE_FAILURE   = '[Club] Save Failure';

export class ClubSearchAction implements Action {
  readonly type = SEARCH;

  constructor (public payload: PagingInfo) { }
}

export class ClubSearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor (public payload: Club [], public count: number) { }
}

 export class ClubAddAction implements Action {
   readonly type = ADD;

   constructor () { }
 }

 export class ClubEditAction implements Action {
   readonly type = EDIT;

   constructor (public payload: number) {
   }
 }

 export class ClubDuplicateAction implements Action {
   readonly type = DUPLICATE;

   constructor (public payload: number) {
   }
 }

 export class ClubEditSuccessAction implements Action {
   readonly type = EDIT_SUCCESS;

   constructor (public payload: Club) {
   }
 }

 export class ClubEditFailedAction implements Action {
   readonly type = EDIT_FAILED;

   constructor (public payload: any) {  }
 }

export class ClubSaveAction implements Action {
  readonly type = SAVE;

  constructor (public payload: Club) {  }
}

export class ClubSaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor () { }
}

export class ClubSaveFailedAction implements Action {
  readonly type = SAVE_FAILURE;

  constructor (public payload: any) {  }
}

export type All
  = ClubSearchAction
   | ClubSearchSuccessAction
   | ClubAddAction
   | ClubEditAction
   | ClubDuplicateAction
   | ClubEditSuccessAction
   | ClubEditFailedAction
   | ClubSaveAction
   | ClubSaveSuccessAction
   | ClubSaveFailedAction
  ;
