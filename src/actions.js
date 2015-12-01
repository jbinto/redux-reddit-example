// Redux action creators

// n.b. Note that all actions are present-tense.
// Not like "postsReceived" or "postsWillReceive".
// Consider why? Actions are always happening in the present tense.

export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';


// XXX here `reddit` is just a string...
export function selectReddit(redditName) {
  return {
    type: SELECT_REDDIT,
    reddit: redditName,
  }
}

// XXX here `reddit` is a complex object of posts :(
export function invalidateReddit(state) {
  return {
    type: INVALIDATE_REDDIT,
    state,
  }
}

export function requestPosts(state) {
  return {
    type: REQUEST_POSTS,
    state,
  }
}

// Here is our "async action". (Not exactly.)
// This is like a callback, when network response is received.
export function receivePosts(state, json) {
  return {
    type: RECEIVE_POSTS,
    state,  // reddit: reddit
    posts: null,  // XXX
    receivedAt: Date.now(),
  }
}
