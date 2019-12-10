import React, { Component } from "react";
import {
  map,
  isEmpty as collectionisEmpty,
  forEach,
  pickBy,
  isPlainObject
} from "lodash";
import { ContainerElement } from "../builder/ContainerElement";
import { FormElement } from "../builder/FormElement";
import { FieldElement } from "../builder/FieldElement";
import ElementContainer from "../elements/ElementContainer";
import PropTypes from "prop-types";
import { classNames } from "../helpers/Helper";
export default class Form extends React.Component {
  static defaultProps = {
    tag: "div",
    className: undefined,
    id: undefined,
    submitLabel: "Submit",
    renderButtons: (handler, label) => {
      return (
        <div className="form-action">
          <button onClick={handler}>{label}</button>
        </div>
      );
    },
    resetForm: true,
    requiredMessage: "This field is required!",
    renderFieldMessage: message => {
      return <div className="form-error-message">{message}</div>;
    },
    onSubmit: values => console.log("Submitted these values: ", values)
  };
  constructor(props) {
    super(props);
    // Set default values.
    let defaultValues = {};
    props.fields.getElements().map(field => {
      if (field.elementType == "field" && field.getDefaultValue()) {
        defaultValues[field.getName()] = field.getDefaultValue();
      }
    });
    this.state = {
      data: defaultValues,
      errors: {}
    };
    console.log(this.state);
    /** @type {FieldElement[]} */
    this.fields = [];
    /** @type {boolean} */
    this.validated = true;
  }

  /**
   * Gets the fields to build them.
   *
   * @returns {ContainerElement} A container element that contains fields.
   */
  getMainContainer = () => {
    return this.props.fields;
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
      value: this.state.data[element.getName()],
      error: this.state.errors[element.getName()],
      onChange: this.handleChange,
      name: element.getName()
    };
  };

  /**
   * Render an element and its subElements.
   *
   * @param {import('../builder/FormElement').FormElement} element
   */
  renderElement = (element, key = -1) => {
    const Component = element.getComponent();
    let elementProps = element.getProps();
    if (element.getType() == "container") {
      const subElements = map(element.getElements(), (subElement, key) => {
        return this.renderElement(subElement, key);
      });
      if (collectionisEmpty(subElements)) {
        throw new Error(
          "You are trying to render a container without any sub elements. That's illegal."
        );
      }

      return (
        <Component key={key} {...elementProps}>
          {subElements}
        </Component>
      );
    } else {
      const formProps = this.getFormProps(element);

      /** @type {FieldElement} */
      let field = element;
      // Add to fields variable for future uses.
      this.fields.push(field);
      // If the field is dependent on another one.
      if (field.getDependency()) {
        // If the value of the dependency field is not set, hide the dependent field
        if (!this.validateValue(this.state.data[field.dependsOn])) {
          return null;
        }
        // If the value exists, replace the dependency strings in the dependent field
        elementProps = field.replaceDependencies(
          this.state.data[field.dependsOn]
        );
      }

      if (field.getType() == "hidden") {
        return <Component {...elementProps} />;
      } else {
        return (
          <ElementContainer
            key={field.getName()}
            label={elementProps.label}
            {...formProps}
          >
            <Component {...elementProps} />
          </ElementContainer>
        );
      }
    }
  };

  setError = (name, errorMessage) => {
    const { showSingleErrorMessage } = this.props;
    if (this.validated || !showSingleErrorMessage) {
      this.validated = false;
      let newErrors = this.state.errors;
      newErrors[name] = errorMessage;
      this.setState({ errors: newErrors });
    }
  };

  validateValue = value => {
    return (
      (typeof value !== "object" &&
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value.length !== 0) ||
      (typeof value === "object" && !collectionisEmpty(value))
    );
  };

  /**
   * Validates the form data.
   */
  validateForm = () => {
    const { requiredMessage, renderFieldMessage } = this.props;
    // Clean the existing errors
    this.setState({ errors: {} });
    forEach(this.fields, field => {
      let name = field.getName();
      let fieldValue = this.state.data[name];
      // Check if required fields are present in the form data.
      if (field.isRequired() && !this.validateValue(fieldValue)) {
        this.setError(name, renderFieldMessage(requiredMessage));
      }
      // Call the field validator
      field.validate(fieldValue);
      if (field.hasError()) {
        this.setError(name, renderFieldMessage(field.getErrorMessage()));
      }
    });
    // Call the custom prop validator.

    return this.validated;
  };

  /**
   * Render all fields.
   *
   * @returns {React.ComponentClass}
   */
  renderFields = () => {
    return this.renderElement(this.getMainContainer());
  };

  /**
   * Handles the form submition.
   *
   */
  handleSubmit = () => {
    this.validateForm();
    if (this.validated) {
      let data = pickBy(this.state.data, (value, key) => {
        return this.validateValue(value);
      });
      this.props.onSubmit(data);
      if (this.props.resetForm) {
        this.resetForm();
      }
    }
    this.validated = true;
  };

  /**
   * Resets all the values of the form
   */
  resetForm = () => {
    this.setState({ data: {} });
  };

  renderButtons = () => {
    const { submitLabel, renderButtons } = this.props;
    let buttons = renderButtons(this.handleSubmit, submitLabel);
    return <div className="form-actions">{buttons}</div>;
  };

  render() {
    const { tag, className, id } = this.props;
    const formClasses = classNames("react-main-form", className);
    const Tag = tag;
    return (
      <Tag className={formClasses} id={id}>
        {this.renderFields()}
        {this.renderButtons()}
      </Tag>
    );
  }
}

Form.propTypes = {
  fields: PropTypes.instanceOf(ContainerElement).isRequired
};

const formProps = {
  value: null,
  error: null
};
