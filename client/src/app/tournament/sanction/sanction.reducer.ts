import { SanctionRequest } from './sanction.model'
import * as SanctionRequestActions from './sanction.actions';

export interface State {
  results: SanctionRequest [];
  loading: boolean;
  count: number;
  // edited: SanctionRequest;
  // error: any;
  // duplicating: boolean;
}

const initialState : State = {
  results: [],
  loading: false,
  count: 0,
  // edited: new SanctionRequest(),
  // error: null,
  // duplicating: false
}

/**
 * Reducer function returning new copy of a state
 */
export function sanctionRequestReducer(state = initialState, action: SanctionRequestActions.All) : State {
  switch (action.type) {
    case SanctionRequestActions.SANCTION_SEARCH: {
      return {
        ...state,
        loading: true,
        count: 0
      };
    }

    case SanctionRequestActions.SANCTION_SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: <SanctionRequest[]>action.payload,
        count: action.count
      };
    }

    // case SanctionRequestActions.SANCTION_DUPLICATE: {
    //   return {
    //     ...state,
    //     edited: new SanctionRequest(),
    //     error: null,
    //     duplicating: true
    //   };
    // }
    //
    // case SanctionRequestActions.SANCTION_ADD:
    // case SanctionRequestActions.SANCTION_EDIT: {
    //   return {
    //     ...state,
    //     edited: new SanctionRequest(),
    //     error: null,
    //     duplicating: false
    //   };
    // }
    //
    // case SanctionRequestActions.SANCTION_EDIT_SUCCESS: {
    //   let editedTemp: SanctionRequest = <SanctionRequest>action.payload;
    //   if (state.duplicating) {
    //     editedTemp.id = 0;
    //   }
    //   return {
    //     ...state,
    //     edited: editedTemp,
    //     duplicating: false
    //   };
    // }
    //
    // case SanctionRequestActions.SANCTION_EDIT_FAILED: {
    //   return {
    //     ...state,
    //     error: action.payload
    //   };
    // }

    default: {
      return state;
    }
  }
}

export const getFeatureState = (state: State) => {
  let feature = state['featureTournaments'];
  let subFeature = feature ['subFeatureSanction'];
  return subFeature;
}

export const getSanctionRequests = (state: State) => {
  return getFeatureState(state).results;
};

export const getCount = (state: State) => {
  return getFeatureState(state).count;
};

export const getLoading = (state: State) => {
  return getFeatureState(state).loading
};

// export const getEdited = (state: State) => {
//   return getFeatureState(state).edited;
// };
//
// export const getError = (state: State) => {
//   return getFeatureState(state).error;
// };

