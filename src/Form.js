import React, { Component } from "react";
import ContainerElement, { createContainer } from "./builder/ContainerElement";
import GenericContainer from "./elements/containers/GenericContainer";
import GenericField from "./elements/fields/GenericField";
import { map, isEmpty as collectionisEmpty } from "lodash";
import FieldElement, { createField } from "./builder/FieldElement";
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  /**
   * Gets the fields to build them.
   *
   * @returns {ContainerElement} A container element that contains fields.
   */
  getMainContainer = () => {
    let fields = createContainer(GenericContainer)
      .setLabel("Container")
      .addField(createField(GenericField, "test"));
    return fields;
  };

  /**
   * Handles any change of value of a field.
   *
   * @param {any} value
   * @param {string} name
   *
   */
  handleChange = (value, name) => {
    let newData = this.state.data;
    newData[name] = value;
    this.setState({ data: newData });
  };

  /**
   * Gets the main form props.
   *
   * @param {FieldElement} element
   *
   * @returns {formProps}
   */
  getFormProps = element => {
    return {
      onChange: this.handleChange,
      value: this.state.data[element.getName()],
      error: null
    };
  };

  /**
   * Render an element and its subElements.
   *
   * @param {import('./builder/FormElement').default} element
   */
  renderElement = element => {
    const Component = element.getComponent();
    const elementProps = element.getProps();
    if (element.getType() == "container") {
      const subElements = map(element.getElements(), subElement => {
        return this.renderElement(subElement);
      });
      if (collectionisEmpty(subElements)) {
        throw new Error(
          "You are trying to render a container without any sub elements."
        );
      }
      return <Component {...elementProps}>{subElements}</Component>;
    } else {
      console.log(element);
      const formProps = this.getFormProps(element);
      return <Component {...formProps} {...elementProps} />;
    }
  };

  renderForm = () => {
    return this.renderElement(this.getMainContainer());
  };

  render() {
    return this.renderForm();
  }
}

const formProps = {
  onChange: null,
  value: null,
  error: null
};
