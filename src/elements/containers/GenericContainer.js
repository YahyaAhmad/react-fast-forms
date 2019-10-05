import React, { Component } from "react";
import PropTypes from "prop-types";
import { classNames } from "../../helpers/Helper";
export default class GenericContainer extends Component {
  render() {
    let { subElements, tag, label, className } = this.props;
    let containerClass = classNames("form-container", className);
    const Tag = tag;
    return (
      <React.Fragment>
        {label && <label className="form-container-title">{label}</label>}
        <Tag className={containerClass}>{this.props.children}</Tag>
      </React.Fragment>
    );
  }
}

GenericContainer.defaultProps = {
  tag: "div",
  children: PropTypes.element
};
