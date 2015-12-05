import React, { Component, PropTypes } from 'react';

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <select
          onChange={e => onChange(e.target.value)}
          value={value}>
          {options.map((opt) =>
            <option value={opt} key={opt}>
              {opt}
            </option>
          )}
        </select>
      </span>
    );
  }
}

Picker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
};
