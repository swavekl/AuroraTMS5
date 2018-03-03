import { FinancialTransaction } from './../financial-transaction.model'
import * as FinancialTransactionActions from './financial-transaction.actions';

export interface State {
  financialTransaction: FinancialTransaction;
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState : State = {
  financialTransaction: null,
  loading: false,
  error: null,
  success: false
}

/**
 * Reducer function returning new copy of a state
 */
export function FinancialTransactionReducer(state = initialState, action: FinancialTransactionActions.All) : State {
  switch (action.type) {
    case FinancialTransactionActions.RESET: {
      return {
        ...state,
        financialTransaction: null,
        loading: false,
        error: null,
        success: false
      };
    }

    case FinancialTransactionActions.PAY: {
      return {
        ...state,
        financialTransaction: null,
        loading: true,
        error: null,
        success: false
      };
    }

    case FinancialTransactionActions.PAY_SUCCESS: {
      return {
        ...state,
        loading: false,
        financialTransaction: <FinancialTransaction>action.payload,
        success: true
      };
    }

     case FinancialTransactionActions.PAY_FAILURE: {
     var error = action.payload;
     if (error.startsWith("[") && error.endsWith("]")) {
        error = error.substring (2, error.length - 2);
     }
       return {
          ...state,
          loading: false,
          error: error
       };
     }

    default: {
      return state;
    }
  }
}

export const getFeatureState = (state: State) => {
  let feature = state['featureShared'];
  let subFeature = feature ['subFeatureFinancialTransaction'];
  return subFeature;
}

export const getFinancialTransaction = (state: State) => {
  return getFeatureState(state).financialTransaction;
};

export const getLoading = (state: State) => {
  return getFeatureState(state).loading
};

export const getError = (state: State) => {
   return getFeatureState(state).error;
};

export const getSuccess = (state: State) => {
   return getFeatureState(state).success;
};

