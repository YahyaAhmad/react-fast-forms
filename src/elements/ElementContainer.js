import React, { Component } from "react";
import { pick } from "lodash";

export default class ElementContainer extends Component {
  handleBeforeChange = value => {
    const { onChange, name } = this.props;
    onChange(value, name);
  };
  render = () => {
    const { label, name, children, error } = this.props;
    const formProps = pick(this.props, "onChange", "setError", "name");
    const elementContainerClass = `form-field-container field-${name}-container`;
    let fieldElement = React.cloneElement(children, {
      ...formProps,
      onChange: this.handleBeforeChange
    });
    return (
      <div className={elementContainerClass}>
        {error}
        <label className="form-field-label">{label}</label>
        {fieldElement}
      </div>
    );
  };
}
