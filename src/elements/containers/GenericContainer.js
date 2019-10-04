import React, { Component } from "react";
import PropTypes from "prop-types";
import FieldElement from "../../builder/FieldElement";
export default class GenericContainer extends Component {
  render() {
    let { subElements, tag, label, className } = this.props;
    let containerClass = `form-container ${className}`.trim();
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
