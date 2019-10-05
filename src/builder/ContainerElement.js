import { FormElement } from "./FormElement";

/**
 *
 * Creates a container
 *
 * @param {React.ComponentClass} container
 *
 * @returns {ContainerElement}
 */
export function createContainer(container) {
  let containerObject = new ContainerElement(container);
  return containerObject;
}

export class ContainerElement extends FormElement {
  constructor(element) {
    super(element);
    this.elementType = "container";
  }
}
