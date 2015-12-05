/* globals describe, afterEach, it */
import { expect } from 'chai';

import nock from 'nock';
import mockStore from './mock_store';
import mockDate from 'mockdate';
import { REQUEST_POSTS, RECEIVE_POSTS, fetchPosts, shouldFetchPosts } from '../src/actions';

describe('synchronous actions', () => {
  it('shouldFetchPosts returns true when reddit not already in postsByReddit', () => {
    const state = {
      postsByReddit: {
        toronto: {
          items: [],
        },
      },
    };

    expect(shouldFetchPosts(state, 'reactjs')).to.be.true();
  });

  it('shouldFetchPosts returns false when isFetching is true', () => {
    const state = {
      postsByReddit: {
        toronto: {
          isFetching: true,
        },
      },
    };

    expect(shouldFetchPosts(state, 'toronto')).to.be.false();
  });

  it('shouldFetchPosts returns true when reddit exists, not fetching, and didInvalidate', () => {
    const state = {
      postsByReddit: {
        toronto: {
          isFetching: false,
          didInvalidate: true,
        },
      },
    };

    expect(shouldFetchPosts(state, 'toronto')).to.be.true();
  });
});

const mockRedditData = {
  data: {
    children: [
      {
        data: {
          title: 'Testing utility from Airbnb',
          url: 'http://airbnb.io/reagent/',
        },
      },
      {
        data: {
          title: 'Real time data flow with Redux and Socket.io',
          url: 'http://spraso.com/real-time-data-flow-with-redux-and-socket-io/',
        },
      },
    ],
  },
};

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
    mockDate.reset();
  });

  // async tests will callback done() to signal test is over
  // read: https://mochajs.org/#asynchronous-code
  it('fetchPosts() dispatches REQUEST_POSTS, then RECEIVE_POSTS', (done) => {
    // nock intercepts HTTP calls without (explicit) monkeypatching or
    // dependency injection
    nock('http://www.reddit.com/')
      .get('/r/reactjs.json')
      .reply(200, mockRedditData);

    mockDate.set('1/1/1980');

    const expectedActions = [
      {
        type: REQUEST_POSTS,
        reddit: 'reactjs',
      },
      {
        type: RECEIVE_POSTS,
        reddit: 'reactjs',
        receivedAt: Date.now(), // woohoo mockDate!
        posts: [
          {
            title: 'Testing utility from Airbnb',
            url: 'http://airbnb.io/reagent/',
          },
          {
            title: 'Real time data flow with Redux and Socket.io',
            url: 'http://spraso.com/real-time-data-flow-with-redux-and-socket-io/',
          },
        ],
      },
    ];

    // XXX should I provide initial state here???

    // n.b. How this works:
    // Provide an array of expected actions to mockStore.
    // * The first action should start the async operation e.g. REQUEST.
    // * The second action should be the result e.g. RECEIVE
    // Then, dispatch the first action using an action creator.
    // The mockStore will assert that the two actions are called.
    const store = mockStore({}, expectedActions, done);
    store.dispatch(fetchPosts('reactjs'));
  });
});
