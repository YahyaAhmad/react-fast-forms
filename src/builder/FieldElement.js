import FormElement from "./FormElement";

/**
 * Creates a new field element
 *
 * @param {Function} field
 * @param {string} name
 */
export function createField(field, name) {
  let fieldObject = new FieldElement(field, name);
  return fieldObject;
}

export default class FieldElement extends FormElement {
  constructor(element, name) {
    super(element);
    this.props.name = name;
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
  setItems(items) {
    this.props.items = items;
    return this;
  }
  getItems() {
    return this.props.items;
  }

  setDependency(name) {
    this.dependsOn = name;
    return this;
  }
  setContainer(container) {
    this.container = container;
    return this;
  }
  getContainer() {
    return this.container ? this.container : EmptyContainer;
  }
  setContainerProps(props) {
    this.containerProps = props;
    return this;
  }
  getContainerProps() {
    return this.containerProps;
  }
  setContainerLabel(label) {
    this.containerLabel = label;
    return this;
  }
  getContainerLabel() {
    return this.containerLabel;
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
