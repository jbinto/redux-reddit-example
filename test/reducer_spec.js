import { expect } from 'chai';
import reducer from '../src/reducer.js';

describe('reducer', () => {
  it('exists', () => {
    expect(reducer(null, null)).to.be.ok;  // `ok` means truthy    
  })
});
