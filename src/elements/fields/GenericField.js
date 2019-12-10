import React, { Component } from "react";
import { omit } from "lodash";
import PropTypes from "prop-types";

export default class GenericField extends Component {
  static defaultProps = {
    type: "text",
    tag: "input"
  };
  render() {
    const { onChange, value, className, type, tag } = this.props;
    const Tag = tag;
    console.log(value);
    return (
      <React.Fragment>
        <Tag
          value={value ? value : ""}
          className={className}
          onChange={e => onChange(e.target.value)}
          type={type}
        />
      </React.Fragment>
    );
  }
}
