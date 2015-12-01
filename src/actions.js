// Redux action creators

// n.b. Note that all actions are present-tense.
// Not like "postsReceived" or "postsWillReceive".
// Consider why? Actions are always happening in the present tense.

export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit,
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit,
  }
}

export function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit,
  }
}

// Here is our "async action". (Not exactly.)
// This is like a callback, when network response is received.
export function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,  // reddit: reddit
    posts: null,  // XXX
    receivedAt: Date.now(),
  }
}
