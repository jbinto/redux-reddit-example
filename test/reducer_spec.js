/* globals describe,it */

import { expect } from 'chai';
import { rootReducer, selectedReddit, posts, postsByReddit } from '../src/reducers';
import { selectReddit, invalidateReddit, requestPosts, receivePosts } from '../src/actions';

const NOOP = { type: 'NOOP' };

describe('selectedReddit reducer', () => {
  const defaultState = () => selectedReddit(undefined, NOOP);

  it('sets a default reddit when action unspecified', () => {
    const nextState = defaultState();
    expect(nextState).to.equal('javascript');
  });

  it('sets the selected reddit', () => {
    const action = selectReddit('toronto');
    const state = 'toronto';
    const nextState = selectedReddit(state, action);
    expect(nextState).to.equal('toronto');
  });
});

// n.b. This reducer doesn't even know which reddit it is.
// See the shape below.
//
// frontend: {
//   isFetching: true,
//   didInvalidate: false,
//   items: []
// },
describe('posts reducer', () => {
  const defaultState = () => posts(undefined, NOOP);

  it('sets a reasonable default', () => {
    const state = defaultState();
    expect(state).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      items: [],
    });
  });

  it('on INVALIDATE_REDDIT, sets didInvalidate', () => {
    const action = invalidateReddit('toronto');
    const nextState = posts(defaultState(), action);
    expect(nextState.didInvalidate).to.be.true();
  });

  it('on REQUEST_POSTS, sets isFetching', () => {
    const action = requestPosts('toronto');
    const nextState = posts(defaultState(), action);
    expect(nextState.isFetching).to.be.true();
  });

  it('on REQUEST_POSTS, unsets didInvalidate', () => {
    const state = defaultState();
    state.didInvalidate = true;

    const action = requestPosts('toronto');
    const nextState = posts(state, action);
    expect(nextState.didInvalidate).to.be.false();
  });

  it('on RECEIVE_POSTS, unsets isFetching/didInvalidate', () => {
    const state = defaultState();
    state.didInvalidate = true;
    state.isFetching = true;

    const action = receivePosts('toronto');
    const nextState = posts(state, action);
    expect(nextState.isFetching).to.be.false();
    expect(nextState.didInvalidate).to.be.false();
  });

  it('on RECEIVE_POSTS, sets state.lastUpdated to action.receivedAt', () => {
    const state = defaultState();
    const action = receivePosts('toronto');

    const nextState = posts(state, action);

    expect(nextState.lastUpdated).to.equal(action.receivedAt);
  });

  it('on RECEIVE_POSTS, sets state.items to action.posts', () => {
    const state = defaultState();
    const action = receivePosts('toronto');

    const nextState = posts(state, action);

    expect(nextState.items).to.equal(action.posts);
  });
});

describe('postsByReddit reducer', () => {
  const originalState = {
    pics: {
      isFetching: false,
      didInvalidate: false,
      items: [],
      lastUpdated: 1449341309741,
    },
  };


  // console.log(`defaultState: ${JSON.stringify(defaultState())}`);

  it('exists', () => {
    expect(postsByReddit(undefined, NOOP)).to.be.ok();  // `ok` means truthy
  });

  it('returns structured object of reddits by delegating to post reducer', () => {
    // const state = defaultState();

    // (Look at doc/state_shape.js)
    // This reducer has to handle 3 out of the 4 actions, everything except
    // SELECT_REDDIT. The reducer is the same name as a root-level state key,
    // `postsByReddit`. All this reducer actually does is add the reddit name
    // as the key, and gets the values by delegating to the `post` reducer.

    const r = 'toronto';
    const actions = [invalidateReddit(r), requestPosts(r), receivePosts(r)];

    actions.forEach(action => {
      const nextState = postsByReddit(originalState, action);

      expect(nextState).to.have.property('toronto');
      expect(nextState).to.have.deep.property('toronto.items');

      expect(nextState).to.have.property('pics');
      expect(nextState).to.have.deep.property('pics.items');
    });
  });
});

describe('rootReducer', () => {
  const defaultState = () => rootReducer(undefined, NOOP);

  it('exists', () => {
    expect(defaultState()).to.be.ok();  // `ok` means truthy
  });
});
