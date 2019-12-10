declare module "react-fast-forms" {
  import * as React from "react";
  import { Function } from "@babel/types";
  export class ContainerElement {}
  type ElementProps = "name" | "label" | "items";
   interface FieldElement {
    setLabel: (label: string) => FieldElement;
    setDefaultValue: (value: any) => FieldElement;
    setPlaceholder: (placeholder: string) => FieldElement;
    setMultiple: (multiple: boolean = true) => FieldElement;
    setProp: (prop: ElementProps, value: any) => FieldElement;
    setRequired: (required: boolean = true) => FieldElement;
    isRequired: () => boolean;
    setRender: (required: boolean = true) => FieldElement;
    isRendered: () => boolean;
    setIgnored: (required: boolean = true) => FieldElement;
    isIgnored: () => boolean;
    addField: (element: FormElement) => FieldElement;
    addFields: (...elements: FormElement) => FieldElement;
    /**
     * Sets the validator function of the field.
     *
     * ```
     * (value, setError) => {
     *    if(!isEmail(value)) {
     *      setError("Invalid Email!");
     *    }
     * }
     * ```
     */
    setValidator: (value:string,setError: (value:string) => void) => FieldElement;
    setDependency: (dependency: string) => FieldElement;
  }

  export interface ContainerElement {
    setLabel: (label: string) => ContainerElement;
    addField: (element: FormElement) => ContainerElement;
    addFields: (...elements: FormElement) => ContainerElement;
  }
  type HTMLTag = "div" | "section" | "fieldset" | "form" | "table";
  type InputType = "hidden" | "text" | "textarea";
  interface FormProps {
    /**
     * The container elemnets object, used to construct the main container of the form. Use the [createContainer]() function to begin constucting fields.
     *
     * ```
     * let mainContainer = createContainer(SomeContainerComponent).setLabel("My Container");
     * let nameField = createField(TextField,"name").setLabel("Name").setPlaceHolder("Name");
     * let titleField = createField(SelectField,"title").setLabel("Title").setProp("items",{mr: "Mr", mrs: "Mrs"});
     * mainContainer.addFields(nameField, titleField);
     *
     * <Form fields={mainContainer} />
     * ```
     *
     */
    fields: ContainerElement;
    tag: HTMLTag;
    className: string;
    id: string;
    defaultValues: any;
    onSubmit: (values:object) => {};
    submitLabel: string;
    /**
     * ```
     * (handler,label) =>
     * <div className="form-actions">
     *  <button onClick={handler}>{submitLabel}</button>
     * </div>
     * ```
     */
    renderButtons: Function;
    /**
     * Set the required field message.
     */
    requiredMessage: string;
    /**
     * Set the render function of the form field messages.
     *
     * ```
     * (errorMessage) => <div className="form-error-message">{errorMessage}</div>
     */
    renderFieldMessage: Function;
  }

  export class Form extends React.Component<FormProps> {}

  export function createField(
    field: React.ComponentClass | InputType,
    name: string
  ): FieldElement;

  export function createContainer(
    container: React.ComponentClass
  ): ContainerElement;
}