import { combineReducers } from 'redux';
import * as actions from '../src/actions'

export const selectedReddit = (state='javascript', action) => {
  switch (action) {
    case actions.SELECT_REDDIT:
      return reddit;
    default:
      return state;
  }
}


export const rootReducer = combineReducers({
  selectedReddit
});
