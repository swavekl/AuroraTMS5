import { SanctionRequest, SanctionRequestStatus } from './sanction.model'
import * as SanctionRequestActions from './sanction.actions';

export interface State {
  results: SanctionRequest [];
  loading: boolean;
  count: number;
  edited: SanctionRequest;
  error: any;
  duplicating: boolean;
  saving: boolean;

}

const initialState : State = {
  results: [],
  loading: false,
  count: 0,
  edited: new SanctionRequest(),
  error: null,
  duplicating: false,
  saving: false
}

/**
 * Reducer function returning new copy of a state
 */
export function sanctionRequestReducer(state = initialState, action: SanctionRequestActions.All) : State {
  switch (action.type) {
    case SanctionRequestActions.SEARCH: {
      return {
        ...state,
        loading: true,
        count: 0
      };
    }

    case SanctionRequestActions.SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: <SanctionRequest[]>action.payload,
        count: action.count
      };
    }

     case SanctionRequestActions.DUPLICATE: {
       return {
         ...state,
         edited: new SanctionRequest(),
         error: null,
         duplicating: true
       };
     }

     case SanctionRequestActions.ADD:
     case SanctionRequestActions.EDIT: {
       return {
         ...state,
         edited: new SanctionRequest(),
         error: null,
         duplicating: false
       };
     }

     case SanctionRequestActions.EDIT_SUCCESS: {
       // convert from generic Object to class instance, so we can call method
       let editedTemp: SanctionRequest = Object.assign(new SanctionRequest(), action.payload);
       editedTemp.fillScreenDef();
       if (state.duplicating) {
         editedTemp.id = -1;
         editedTemp.status = SanctionRequestStatus.Started;
       }

       return {
         ...state,
         edited: editedTemp,
         duplicating: false
       };
     }

     case SanctionRequestActions.EDIT_FAILED: {
       return {
         ...state,
         error: action.payload
       };
     }

     case SanctionRequestActions.SAVE: {
       return {
         ...state,
         saving: true,
         error: null
       };
     }

    case SanctionRequestActions.SAVE_SUCCESS: {
      return {
        ...state,
        saving: false,
        error: null
      };
    }

    case SanctionRequestActions.SAVE_FAILURE: {
    console.log ('SAVE_FAILURE errors ', action.payload);
      return {
        ...state,
        saving: false,
        error: action.payload
      };
    }

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

export const getEdited = (state: State) => {
   return getFeatureState(state).edited;
};

export const getError = (state: State) => {
   return getFeatureState(state).error;
};

