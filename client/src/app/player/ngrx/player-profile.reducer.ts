import { PlayerProfile} from './../player-profile.model'
import * as PlayerProfileActions from './../ngrx/player-profile.actions';

export interface State {
  results: PlayerProfile [];
  loading: boolean;
  count: number;
  edited: PlayerProfile;
  error: any;
  duplicating: boolean;
  saving: boolean;

}

const initialState : State = {
  results: [],
  loading: false,
  count: 0,
  edited: new PlayerProfile(),
  error: null,
  duplicating: false,
  saving: false
}

/**
 * Reducer function returning new copy of a state
 */
export function PlayerProfileReducer(state = initialState, action: PlayerProfileActions.All) : State {
  switch (action.type) {
    case PlayerProfileActions.SEARCH: {
      return {
        ...state,
        loading: true,
        count: 0
      };
    }

    case PlayerProfileActions.SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: <PlayerProfile[]>action.payload,
        count: action.count
      };
    }
/*
     case PlayerProfileActions.DUPLICATE: {
       return {
         ...state,
         edited: new PlayerProfile(),
         error: null,
         duplicating: true
       };
     }
*/
     case PlayerProfileActions.ADD:
     case PlayerProfileActions.EDIT: {
       return {
         ...state,
         edited: new PlayerProfile(),
         error: null,
         duplicating: false
       };
     }

     case PlayerProfileActions.EDIT_SUCCESS: {
       // convert from generic Object to class instance, so we can call method
       let editedTemp: PlayerProfile = Object.assign(new PlayerProfile(), action.payload);
//       editedTemp.fillScreenDef();
       if (state.duplicating) {
         editedTemp.id = -1;
//         editedTemp.status = PlayerProfileStatus.Started;
       }

       return {
         ...state,
         edited: editedTemp,
         duplicating: false
       };
     }

     case PlayerProfileActions.EDIT_FAILED: {
       return {
         ...state,
         error: action.payload
       };
     }

     case PlayerProfileActions.SAVE: {
       return {
         ...state,
         saving: true,
         error: null
       };
     }

    case PlayerProfileActions.SAVE_SUCCESS: {
      return {
        ...state,
        saving: false,
        error: null
      };
    }

    case PlayerProfileActions.SAVE_FAILURE: {
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

export const getPlayerProfiles = (state: State) => {
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

