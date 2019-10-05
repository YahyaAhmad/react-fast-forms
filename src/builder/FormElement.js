import { forEach } from "lodash";

export class FormElement {
  constructor(element) {
    this.element = element;
    this.props = {};
    this.fields = [];
    this.elementType = null;
    this.formProps = {};
  }
  getFormProps = () => {
    return this.formProps;
  };
  setFormProps = props => {
    this.formProps = props;
    return this;
  };
  getType = () => {
    return this.elementType;
  };

  setLabel = label => {
    this.props.label = label;
    return this;
  };

  getLabel = () => {
    return this.props.label;
  };

  setProp = (name, value) => {
    this.props[name] = value;
    return this;
  };

  getProps = () => {
    return this.props;
  };

  getComponent = () => {
    return this.element;
  };

  /**
   * Returns sub elements of the element.
   *
   * @returns {FormElement[]}
   */
  getElements = () => {
    return this.fields;
  };

  addField = field => {
    this.fields.push(field);
    return this;
  };

  /**
   * Add a collection of fields in one go.
   *
   * @param {FormElement[]} fields
   */
  addFields = (...fields) => {
    forEach(fields, field => {
      this.addField(field);
    });
  };
}
