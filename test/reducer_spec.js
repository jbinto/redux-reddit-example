import { expect } from 'chai';
import reducer from '../src/reducer.js';

describe('reducer', () => {
  it('exists', () => {
    expect(
      reducer(undefined, undefined)
    ).to.be.ok;  // `ok` means truthy    
  })
});
