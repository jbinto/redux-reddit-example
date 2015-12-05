// Redux action creators

import fetch from 'isomorphic-fetch';

// n.b. Note that all actions are present-tense.
// Not like "postsReceived" or "postsWillReceive".
// Consider why? Actions are always happening in the present tense.
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';


// XXX here `reddit` is just a string...
// Change it to `redditName` to make things clearer.
export function selectReddit(redditName) {
  return {
    type: SELECT_REDDIT,
    reddit: redditName,
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit,
  };
}

export function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit,
  };
}

// Here is our "async action". (Not exactly.)
// This is like a callback, when network response is received.
export function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,  // reddit: reddit
    // XXX: json should really never be null....
    posts: json ? json.children.map(c => c.data) : [],
    // XXX: this hardcoded date makes testing extremely problematic
    receivedAt: Date.now(),
  };
}


// The following Action Creator is a thunk.
// This means, instead of returning a plain object, it returns
// a function, that, when called, will resolve to the action object.
// redux-thunk middleware takes care of this plumbing.

// XXX: why fetchPosts action creator without a corresponding action type?
// XXX: perhaps it is best to view as a composite of two existing actions?

export function fetchPosts(reddit) {
  // Thunk middleware passes us a dispatch function, so we can
  // dispatch inside a dispatch (??)
  return (dispatch) => {
    // First dispatch: inform app that API call is starting
    dispatch(requestPosts(reddit));

    // The function called by thunk middleware can return a value.
    // This will be the return from an outside `store.dispatch` call.
    // Here, we return a promise. (XXX does calling code need to know??)
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivePosts(reddit, json));
      }
    );
  };
}
