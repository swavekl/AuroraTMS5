import { InsuranceRequest, InsuranceRequestStatus } from './../insurance.model'
import * as InsuranceRequestActions from './../ngrx/insurance.actions';
import { DateUtils } from '../../../utils/date-utils';

export interface State {
  results: InsuranceRequest [];
  loading: boolean;
  count: number;
  edited: InsuranceRequest;
  error: any;
  duplicating: boolean;
  saving: boolean;
}

const initialState : State = {
  results: [],
  loading: false,
  count: 0,
  edited: new InsuranceRequest(),
  error: null,
  duplicating: false,
  saving: false
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

    case InsuranceRequestActions.DUPLICATE: {
      return {
        ...state,
        edited: new InsuranceRequest(),
        error: null,
        duplicating: true
      };
    }

    case InsuranceRequestActions.ADD:
    case InsuranceRequestActions.EDIT: {
      return {
        ...state,
        edited: new InsuranceRequest(),
        error: null,
        duplicating: false
      };
    }

    case InsuranceRequestActions.EDIT_SUCCESS: {
      let editedTemp: InsuranceRequest = <InsuranceRequest>action.payload;
      if (state.duplicating) {
        editedTemp.id = 0;
        editedTemp.status = InsuranceRequestStatus.Started;
      }

      let dateUtils = new DateUtils();
      editedTemp.eventStartDate = dateUtils.convertFromUTCToLocalDate (editedTemp.eventStartDate);
      editedTemp.eventEndDate = dateUtils.convertFromUTCToLocalDate (editedTemp.eventEndDate);
      editedTemp.requestDate = dateUtils.convertFromUTCToLocalDate (editedTemp.requestDate);

//      console.log ('got I.R. to edited ', editedTemp);
      return {
        ...state,
        edited: editedTemp,
        duplicating: false
      };
    }

    case InsuranceRequestActions.EDIT_FAILED: {
      return {
        ...state,
        error: action.payload
      };
    }

    case InsuranceRequestActions.SAVE: {
      return {
        ...state,
        saving: true,
        error: null
      };
    }

    case InsuranceRequestActions.SAVE_SUCCESS: {
      return {
        ...state,
        saving: false,
        error: null
      };
    }

    case InsuranceRequestActions.SAVE_FAILURE: {
//    console.log ('errors ', action.payload);
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
   return getFeatureState(state).edited;
};

export const getError = (state: State) => {
   return getFeatureState(state).error;
};

