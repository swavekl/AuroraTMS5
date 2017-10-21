import { Action} from '@ngrx/store';
import { Tournament } from '../tournament.model'

export const SEARCH         = '[Tournament] Search';
export const SEARCH_SUCCESS = '[Tournament] Search Success';

export class TournamentSearchAction implements Action {
  readonly type = SEARCH;

  constructor (public payload: String) { }
}

export class TournamentSearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor (public payload: Tournament []) { }
}

export type All
  = TournamentSearchAction
  | TournamentSearchSuccessAction;

