import { applyMiddleware } from 'redux';
import { expect } from 'chai';
import thunk from 'redux-thunk';

const middlewares = [ thunk ];

// http://rackt.org/redux/docs/recipes/WritingTests.html
const mockStore = (getState, expectedActions, done) => {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions must be an array');
  }

  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done must be a function, or undefined');
  }

  const mockStoreWithoutMiddleware = () => {
    return {
      getState() {
        // WTF? Why wouldn't it be a function...
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();

        try {
          expect(action).to.deep.equal(expectedAction);
          if (done && expectedActions.length === 0) {
            // call the callback, signal end
            done();
          }
        } catch (e) {
          done(e);
        }
      },
    };
  };

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
};

export default mockStore;
