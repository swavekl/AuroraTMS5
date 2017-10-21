import { InsuranceRequest } from './insurance.model'
import * as InsuranceRequestActions from './insurance.actions';

export interface State {
  results: InsuranceRequest [];
  loading: number;
}

const initialState : State = {
  results: [],
  loading: 0
}

/**
* Reducer function returning new copy of a state
*/
export function insuranceRequestReducer(state = initialState, action: InsuranceRequestActions.All) : State {
  switch (action.type) {
    case InsuranceRequestActions.SEARCH: {
      return {
        ...state,
        loading: 0
      };
    }

    case InsuranceRequestActions.SEARCH_SUCCESS: {
      return {
        ...state,
        loading: 100,
        results: <InsuranceRequest[]>action.payload
      };
    }

     default: {
      return state;
     }
  }
}

export const getFeatureState = (state: State) => {
  let feature = state['featureTournaments'];
  let subFeature = feature ['subFeatureInsurance'];
  return subFeature;
}

export const getInsuranceRequests = (state: State) => {
  return getFeatureState(state).results;
};

export const getLoading = (state: State) => {
   return getFeatureState(state).loading
};
