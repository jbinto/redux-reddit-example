import { expect } from 'chai';
import { rootReducer, selectedReddit } from '../src/reducers';
import { selectReddit } from '../src/actions';

describe('selectedReddit reducer', () => {
  it('sets a default reddit when action unspecified', () => {
    const state = undefined;
    const action = undefined;
    const nextState = selectedReddit(state, action);
    expect(nextState).to.equal('javascript');
  });

  it('sets the selected reddit', () => {
    const action = selectReddit('toronto');
    const state = 'toronto';
    const nextState = selectedReddit(state, action);
    expect(nextState).to.equal('toronto');
  });
});

describe('rootReducer', () => {
  it('exists', () => {
    expect(
      rootReducer(undefined, undefined)
    ).to.be.ok;  // `ok` means truthy
  });
});
