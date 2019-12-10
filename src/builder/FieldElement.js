import { FormElement } from "./FormElement";
import { cloneDeep } from "lodash";
import { GenericField } from "..";
import OptionsField from "../elements/fields/OptionsField";
/**
 * Creates a new field element
 *
 * @param {Function} field
 * @param {string} name
 *
 * @returns {FieldElement}
 */
export function createField(field, name) {
  let fieldObject;
  if (typeof field === "string") {
    switch (field) {
      case "options":
        fieldObject = new FieldElement(OptionsField, name);
        break;
      case "textarea":
        fieldObject = new FieldElement(GenericField, name);
        fieldObject.setProp("tag", "textarea");
        break;
      default:
        fieldObject = new FieldElement(GenericField, name);
        fieldObject.setProp("type", field);
        break;
    }
  } else {
    fieldObject = new FieldElement(field, name);
  }
  return fieldObject;
}

export class FieldElement extends FormElement {
  constructor(element, name) {
    super(element);
    this.props.name = name;
    this.props.fields = [];
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
  addField = element => {
    if (element.isRequired()) {
      this.setRequired();
    }
    this.props.fields.push(element);
    return this;
  };
  recursiveReplaceDependenceis = (object, value) => {
    Object.keys(object).map(key => {
      if (key === "fields") return;
      if (typeof object[key] === "object" && object[key] !== null) {
        object[key] = this.recursiveReplaceDependenceis(object[key], value);
      } else if (typeof object[key] === "string") {
        object[key] = object[key].replace(`{${this.getDependency()}}`, value);
      }
    });
    return object;
  };
  replaceDependencies(value) {
    let props = cloneDeep(this.props);
    props = this.recursiveReplaceDependenceis(props, value);
    return props;
  }
}
