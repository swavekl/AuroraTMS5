import { Tournament } from '../tournament.model';
import * as ConfigureTournamentActions from './configure-tournament.actions';

export interface State {
  query: string;
  results: Tournament [];
  loading: boolean;
}

const initialState : State = {
  query: '',
  results: [],
  loading: false
}

/**
* Reducer function returning new copy of a state
*/
export function configureTournamentReducer(state = initialState, action: ConfigureTournamentActions.All) : State {
  switch (action.type) {
    case ConfigureTournamentActions.SEARCH: {
      if (state.query === '') {
        return {
          results: [],
          loading: false,
          query: ''
        };
      }

      return {
        ...state,
        query: <string>action.payload
      };

    }

    case ConfigureTournamentActions.SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: <Tournament[]>action.payload
      };
    }

     default: {
      return state;
     }
  }
}

export const getTournaments = (state: State) => state.results;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;
