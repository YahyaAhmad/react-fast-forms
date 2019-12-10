import { FormElement } from "./FormElement";
import { GenericContainer } from "..";

/**
 *
 * Creates a container
 *
 * @param {React.ComponentClass} container
 *
 * @returns {ContainerElement}
 */
export function createContainer(container) {
  let containerElement = container ? container : GenericContainer;
  let containerObject = new ContainerElement(containerElement);
  return containerObject;
}

export class ContainerElement extends FormElement {
  constructor(element) {
    super(element);
    this.elementType = "container";
  }
}
