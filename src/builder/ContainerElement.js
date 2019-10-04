import FormElement from "./FormElement";

export function createContainer(container) {
  let containerObject = new ContainerElement(container);
  return containerObject;
}

export default class ContainerElement extends FormElement {
  constructor(element) {
    super(element);
    this.elementType = "container";
  }
}
