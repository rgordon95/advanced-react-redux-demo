import * as types from '../actions/actionTypes';
import initialState from "./initialState";

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  }

  return state;
}
