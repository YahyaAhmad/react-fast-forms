import { FormElement } from "./FormElement";

/**
 * Creates a new field element
 *
 * @param {Function} field
 * @param {string} name
 *
 * @returns {import('.').FieldElement}
 */
export function createField(field, name) {
  let fieldObject = new FieldElement(field, name);
  return fieldObject;
}

export class FieldElement extends FormElement {
  constructor(element, name) {
    super(element);
    this.props.name = name;
    this.validator = () => true;
    this.error = false;
    this.errorMessage = "This field is not valid";
    this.elementType = "field";
  }
  getName = () => {
    return this.props.name;
  };
  setEmptyValue(value) {
    this.props.emptyValue = value;
    return this;
  }
  getDefaultValue() {
    return this.props.defaultValue;
  }
  setDefaultValue(value) {
    this.props.defaultValue = value;
    return this;
  }
  setPlaceholder(placeholder) {
    this.props.options.placeholder = placeholder;
    return this;
  }
  setMultiple(multiple = true) {
    this.props.multiple = multiple;
    return this;
  }
  isMultiple() {
    return this.props.multiple;
  }
  setRequired(required = true) {
    this.props.required = required;
    return this;
  }
  isRequired() {
    return this.props.required;
  }
  setValidator = validator => {
    this.validator = validator;
    return this;
  };
  validate = value => {
    this.error = false;
    this.validator(value, this.setError);
  };
  setError = errorMessage => {
    this.error = true;
    this.errorMessage = errorMessage;
  };
  hasError = () => {
    return this.error;
  };
  getErrorMessage = () => {
    return this.errorMessage;
  };
  setDependency(name) {
    this.dependsOn = name;
    return this;
  }
  getDependency() {
    return this.dependsOn;
  }
  replaceDependencies(value) {
    Object.keys(this.props).map(key => {
      if (typeof this.props[key] === "object" && this.props[key] !== null) {
        this.props[key] = this.replaceDependencies(this.props[key]);
      } else if (typeof this.props[key] === "string") {
        this.props[key] = this.props[key].replace(
          `{${this.getDependency()}}`,
          value
        );
      }
    });
    return this;
  }
}
