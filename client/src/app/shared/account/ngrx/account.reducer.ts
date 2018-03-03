import { Account } from './../account.model'
import * as AccountActions from './account.actions';

export interface State {
  systemPublicKey: string;
}

const initialState : State = {
  systemPublicKey: null,
}

/**
 * Reducer function returning new copy of a state
 */
export function AccountReducer(state = initialState, action: AccountActions.All) : State {
  switch (action.type) {
    case AccountActions.SYSTEM: {
      return {
        ...state,
        systemPublicKey: null
      };
    }

    case AccountActions.SYSTEM_SUCCESS: {
      var account:Account = <Account>action.payload;
      return {
        ...state,
        systemPublicKey: account.stripePublicKey
      };
    }

     case AccountActions.SYSTEM_FAILURE: {
     var error = action.payload;
     if (error.startsWith("[") && error.endsWith("]")) {
        error = error.substring (2, error.length - 2);
     }
       return {
          ...state,
          systemPublicKey: null
       };
     }

    default: {
      return state;
    }
  }
}

export const getFeatureState = (state: State) => {
  let feature = state['featureShared'];
  let subFeature = feature ['subFeatureAccount'];
  return subFeature;
}

export const getSystemPublicKey = (state: State) => {
  return getFeatureState(state).systemPublicKey;
};

export const getError = (state: State) => {
   return getFeatureState(state).error;
};

