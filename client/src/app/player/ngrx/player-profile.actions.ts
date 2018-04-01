import { Action} from '@ngrx/store';
import { PlayerProfile } from './../player-profile.model';
import { PagingInfo } from './../../utils/paging-info';

export const SEARCH         = '[PlayerProfile] Search';
export const SEARCH_SUCCESS = '[PlayerProfile] Search Success';
export const ADD            = '[PlayerProfile] Add';
export const EDIT           = '[PlayerProfile] Edit';
export const EDIT_SUCCESS   = '[PlayerProfile] Edit Success';
export const EDIT_FAILED    = '[PlayerProfile] Edit Failed';
export const SAVE           = '[PlayerProfile] Save';
export const SAVE_SUCCESS   = '[PlayerProfile] Save Success';
export const SAVE_FAILURE   = '[PlayerProfile] Save Failure';

export class PlayerProfileSearchAction implements Action {
  readonly type = SEARCH;

  constructor (public payload: PagingInfo,
  public firstName: string,
  public lastName: string,
  public membershipId: number
  ) { }
}

export class PlayerProfileSearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor (public payload: PlayerProfile [], public count: number) { }
}

 export class PlayerProfileAddAction implements Action {
   readonly type = ADD;

   constructor () { }
 }

 export class PlayerProfileEditAction implements Action {
   readonly type = EDIT;

   constructor (public payload: number) {
   }
 }

 export class PlayerProfileEditSuccessAction implements Action {
   readonly type = EDIT_SUCCESS;

   constructor (public payload: PlayerProfile) {
   }
 }

 export class PlayerProfileEditFailedAction implements Action {
   readonly type = EDIT_FAILED;

   constructor (public payload: any) {  }
 }

export class PlayerProfileSaveAction implements Action {
  readonly type = SAVE;

  constructor (public payload: PlayerProfile) {  }
}

export class PlayerProfileSaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;

  constructor () { }
}

export class PlayerProfileSaveFailedAction implements Action {
  readonly type = SAVE_FAILURE;

  constructor (public payload: any) {  }
}

export type All
  = PlayerProfileSearchAction
   | PlayerProfileSearchSuccessAction
   | PlayerProfileAddAction
   | PlayerProfileEditAction
   | PlayerProfileEditSuccessAction
   | PlayerProfileEditFailedAction
   | PlayerProfileSaveAction
   | PlayerProfileSaveSuccessAction
   | PlayerProfileSaveFailedAction
  ;
