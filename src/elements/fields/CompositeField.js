import React, { Component } from "react";
import { map, isEqual, some } from "lodash";
import Form from "../../forms/Form";
import PropTypes from "prop-types";
import { createContainer } from "../../builder/ContainerElement";
import { FormElement } from "../../builder/FormElement";
import GenericContainer from "../containers/GenericContainer";
export default class CompositeField extends Form {
  handleChange = (value, subElementName) => {
    const { onChange, name } = this.props;
    let myData = this.state.data;
    myData[subElementName] = value;
    this.setState({ data: myData });
    if (this.requiredFieldIsEmpty()) {
      onChange("");
    } else {
      onChange(myData, name);
    }
  };

  renderButtons = () => {
    return null;
  };

  requiredFieldIsEmpty = () => {
    return some(this.fields, field => {
      let fieldValue = this.state.data[field.getName()];
      return field.isRequired() && !this.validateValue(fieldValue);
    });
  };

  componentWillReceiveProps = nextProps => {
    if (!isEqual(this.props.error, nextProps.error)) {
      this.validated = true;
      this.validateForm();
    }
  };

  renderFields = () => {
    let elements = this.getMainContainer();
    let mainContainer = createContainer(GenericContainer).addFields(elements);
    return this.renderElement(mainContainer);
  };

  render() {
    return <React.Fragment>{this.renderFields()}</React.Fragment>;
  }
}

CompositeField.propTypes = {
  fields: PropTypes.arrayOf(FormElement).isRequired
};
