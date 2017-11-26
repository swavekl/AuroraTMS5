import { Club } from './../club.model'
import * as ClubActions from './club.actions';

export interface State {
  results: Club [];
  loading: boolean;
  count: number;
  edited: Club;
  error: any;
  duplicating: boolean;
  saving: boolean;
}

const initialState : State = {
  results: [],
  loading: false,
  count: 0,
  edited: new Club(),
  error: null,
  duplicating: false,
  saving: false
}

/**
 * Reducer function returning new copy of a state
 */
export function clubReducer(state = initialState, action: ClubActions.All) : State {
  switch (action.type) {
    case ClubActions.SEARCH: {
      return {
        ...state,
        loading: true,
        count: 0
      };
    }

    case ClubActions.SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: <Club[]>action.payload,
        count: action.count
      };
    }

     case ClubActions.DUPLICATE: {
       return {
         ...state,
         edited: new Club(),
         error: null,
         duplicating: true
       };
     }

     case ClubActions.ADD:
     case ClubActions.EDIT: {
       return {
         ...state,
         edited: new Club(),
         error: null,
         duplicating: false
       };
     }

     case ClubActions.EDIT_SUCCESS: {
       // convert from generic Object to class instance, so we can call method
       let editedTemp: Club = Object.assign(new Club(), action.payload);
       if (state.duplicating) {
         editedTemp.id = -1;
       }

       console.log ('in EDIT_SUCCESS editedTemp ', editedTemp);

       return {
         ...state,
         edited: editedTemp,
         duplicating: false
       };
     }

     case ClubActions.EDIT_FAILED: {
       return {
         ...state,
         error: action.payload
       };
     }

     case ClubActions.SAVE: {
       return {
         ...state,
         saving: true,
         error: null
       };
     }

    case ClubActions.SAVE_SUCCESS: {
      return {
        ...state,
        saving: false,
        error: null
      };
    }

    case ClubActions.SAVE_FAILURE: {
    //console.log ('SAVE_FAILURE errors ', action.payload);
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
  let feature = state['featureClub'];
  let subFeature = feature ['subFeatureClub'];
  return subFeature;
}

export const getClubs = (state: State) => {
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

