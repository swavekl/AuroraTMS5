import { InsuranceRequest } from './insurance.model'
import * as InsuranceRequestActions from './insurance.actions';

export interface State {
  results: InsuranceRequest [];
  loading: boolean;
  count: number;
  edited: InsuranceRequest;
}

const initialState : State = {
  results: [],
  loading: false,
  count: 0,
  edited: null
}

/**
* Reducer function returning new copy of a state
*/
export function insuranceRequestReducer(state = initialState, action: InsuranceRequestActions.All) : State {
  switch (action.type) {
    case InsuranceRequestActions.SEARCH: {
      return {
        ...state,
        loading: true,
        count: 0
      };
    }

    case InsuranceRequestActions.SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: <InsuranceRequest[]>action.payload,
        count: action.count
      };
    }

    case InsuranceRequestActions.ADD:
    case InsuranceRequestActions.EDIT: {
      return {
        ...state,
        edited: new InsuranceRequest()
      };
    }

    case InsuranceRequestActions.EDIT_SUCCESS: {
      return {
        ...state,
        edited: <InsuranceRequest>action.payload,
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

export const getCount = (state: State) => {
  return getFeatureState(state).count;
};

export const getLoading = (state: State) => {
   return getFeatureState(state).loading
};

export const getEdited = (state: State) => {
   return getFeatureState(state).edited
};
