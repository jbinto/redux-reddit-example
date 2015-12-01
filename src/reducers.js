import { combineReducers } from 'redux';
import { SELECT_REDDIT } from '../src/actions'

export const selectedReddit = (state='javascript', action) => {
  // XXX switch action.type???
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit;
    default:
      return state;
  }
}

export const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case 'INVALIDATE_REDDIT':
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case 'REQUEST_POSTS':
      return Object.assign({}, state, {
        isFetching: true,
        // why even track invalidation?
        // Guess: enable/disable refresh button?
        didInvalidate: false
      });
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        updatedAt: action.receivedAt,
        items: action.posts
      });
    default:
      return state;
  }
}


export const rootReducer = combineReducers({
  selectedReddit
});
