import { expect } from 'chai';
import { rootReducer, selectedReddit, posts } from '../src/reducers';
import { selectReddit, invalidateReddit } from '../src/actions';

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
  it('sets a reasonable default', () => {
    const nextState = posts(undefined, NOOP);
    expect(nextState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      items: []
    });
  });

  it('sets didInvalidate on INVALIDATE_REDDIT', () => {
    const state = posts(undefined, NOOP);

    const action = invalidateReddit(state);
    const nextState = posts(state, action);

    expect(nextState.didInvalidate).to.be.true;
  })
});

describe('rootReducer', () => {
  it('exists', () => {
    expect(
      rootReducer(undefined, NOOP)
    ).to.be.ok;  // `ok` means truthy
  });
});
