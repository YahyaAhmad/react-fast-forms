import { forEach } from "lodash";

export class FormElement {
  constructor(element) {
    this.element = element;
    this.props = {
      fields: []
    };
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
   * @returns {Element[]}
   */
  getElements = () => {
    return this.props.fields;
  };

  addField = field => {
    this.props.fields.push(field);
    return this;
  };

  /**
   * Add a collection of fields in one go.
   *
   * @param {FormElement[]} fields
   */
  addFields = (...fields) => {
    console.log(fields);
    forEach(fields, field => {
      this.addField(field);
    });
  };
}
