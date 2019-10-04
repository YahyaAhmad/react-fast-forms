import React, { Component } from "react";
import omit from "lodash/omit";

export default class ElementContainer extends Component {
  render() {
    const Element = this.props.element;
    const props = omit(this.props, ["children", "element"]);
    return <Element {...props} />;
  }
}

