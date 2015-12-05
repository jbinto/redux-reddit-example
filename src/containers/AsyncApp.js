import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  selectReddit,
  fetchPostsIfNeeded,
  invalidateReddit,
} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    // XXX this boilerplate is ugly. Why is it only required sometimes?
    // I think if we use React.createClass this is automagical...
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  // what is the difference between this and componentWillReceiveProps?
  componentDidMount() {
    const { dispatch, selectedReddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  // looks like this fires just before componentDidMount.
  // Not sure why we do this in both places?
  // Can't we just do it on mount? (Or just here?)
  componentDidReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedReddit));
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit));
  }

  // Strange to deal with raw DOM events here.
  // Feels icky. Probably just me.
  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedReddit } = this.props;
    dispatch(invalidateReddit(selectedReddit));

    // aha! This won't be 'needed' if it weren't for the preceeding
    // INVALIDATE_REDDIT call...
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  render() {
    const {
      selectedReddit,
      posts,
      isFetching,
      lastUpdated,
    } = this.props;

    return (
      <div>
        <Picker
          options={['reactjs', 'javascript']}
          value={selectedReddit}
          onChange={this.handleChange}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            </span>
          }
          {' '}
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
               Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length !== 0 &&
          // Double curly? No: a JSON {} inside a JSX {}
          // Also note React CSS uses CSS-DOM attributes
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }

}


AsyncApp.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // This whole function is gnarly as hell.
  // Way too much sugar here. I don't like it.
  const { selectedReddit, postsByReddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

// react-redux connect binding
export default connect(mapStateToProps)(AsyncApp);
