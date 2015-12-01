import { expect } from 'chai';
import { rootReducer, selectedReddit, posts } from '../src/reducers';
import { selectReddit, invalidateReddit, requestPosts, receivePosts } from '../src/actions';

const NOOP = { type: 'NOOP' };

describe('selectedReddit reducer', () => {
  it('sets a default reddit when action unspecified', () => {
    const nextState = selectedReddit(undefined, NOOP);
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
  const defaultState = () => {
    return posts(undefined, NOOP);
  }

  it('sets a reasonable default', () => {
    const nextState = defaultState();
    expect(nextState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      items: []
    });
  });

  it('on INVALIDATE_REDDIT, sets didInvalidate', () => {
    const state = defaultState();
    const action = invalidateReddit(state);
    const nextState = posts(state, action);
    expect(nextState.didInvalidate).to.be.true;
  });

  it('on REQUEST_POSTS, sets isFetching', () => {
    const state = defaultState();
    const action = requestPosts(state);
    const nextState = posts(state, action);
    expect(nextState.isFetching).to.be.true;
  });

  it('on REQUEST_POSTS, unsets didInvalidate', () => {
    const state = defaultState();
    state.didInvalidate = true;

    const action = requestPosts(state);
    const nextState = posts(state, action);
    expect(nextState.didInvalidate).to.be.false;
  });

  it('on RECEIVE_POSTS, unsets isFetching/didInvalidate', () => {
    const state = defaultState();
    state.didInvalidate = true;
    state.isFetching = true;

    const action = receivePosts(state);
    const nextState = posts(state, action);
    expect(nextState.isFetching).to.be.false;
    expect(nextState.didInvalidate).to.be.false;
  });

  it('on RECEIVE_POSTS, sets state.lastUpdated to action.receivedAt', () => {
    const state = defaultState();
    const action = receivePosts(state);

    const nextState = posts(state, action);

    expect(nextState.updatedAt).to.equal(action.receivedAt);
  });

  it('on RECEIVE_POSTS, sets state.items to action.posts', () => {
    const state = defaultState();
    const action = receivePosts(state);

    const nextState = posts(state, action);

    expect(nextState.items).to.equal(action.posts);
  });

});

describe('rootReducer', () => {
  const defaultState = () => rootReducer(undefined, NOOP);

  it('exists', () => {
    expect(defaultState()).to.be.ok;  // `ok` means truthy
  });
});
