import React, { Component } from "react";

export default class GenericField extends Component {
  render() {
    const { onChange, value, className } = this.props;
    return (
      <React.Fragment>
        <input
          type="text"
          value={value}
          className={className}
          onChange={e => onChange(e.target.value)}
        />
      </React.Fragment>
    );
  }
}
