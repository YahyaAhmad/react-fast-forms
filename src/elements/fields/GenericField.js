import React, { Component } from "react";

export default class GenericField extends Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
}
