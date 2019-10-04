export default class FormElement {
  constructor(element) {
    this.element = element;
    this.props = {
      fields: {}
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

  addField = (field, name) => {
    if (!this.props.fields) {
      this.props.fields = {};
    }
    this.props.fields[name] = field;
    return this;
  };
}
