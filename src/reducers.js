import { combineReducers } from 'redux';
import { SELECT_REDDIT } from '../src/actions';

export const selectedReddit = (state = 'javascript', action) => {
  // XXX switch action.type???
  switch (action.type) {
  case SELECT_REDDIT:
    return action.reddit;
  default:
    return state;
  }
};

export const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
  case 'INVALIDATE_REDDIT':
    return Object.assign({}, state, {
      didInvalidate: true,
    });
  case 'REQUEST_POSTS':
    return Object.assign({}, state, {
      isFetching: true,
      // why even track invalidation?
      // Guess: enable/disable refresh button?
      // (XXX: middleware will check didInvalidate and fire request)
      // (XXX: no UI component to didInvalidate; rather isFetching)
      didInvalidate: false,
    });
  case 'RECEIVE_POSTS':
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt,
      items: action.posts,
    });
  default:
    return state;
  }
};

export const postsByReddit = (state = {}, action) => {
  switch (action.type) {
  case 'INVALIDATE_REDDIT':
  case 'REQUEST_POSTS':
  case 'RECEIVE_POSTS':
    return Object.assign({}, state, {
      // Lots of cleverness going on here.
      // If `state[action.reddit]` is undefined, `posts` reducer can handle it.
      // Remember to pass only the relevant state subtree!
      [action.reddit]: posts(state[action.reddit], action),
    });
  default:
    return state;
  }
};

export const rootReducer = combineReducers({
  selectedReddit,
  postsByReddit,
});

export default rootReducer;
