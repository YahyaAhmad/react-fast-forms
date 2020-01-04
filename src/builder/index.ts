import { isValidElement } from "react";
import GenericContainer from "../elements/GenericContainer";
import GenericField from "../elements/GenericField";

export interface ElementInterface<T> {
    label: string
    name: string
    component: React.FC
    type: string
    props: any
    getLabel: () => string
    setLabel: (label: string) => T
    getName: () => string
    setName: (name: string) => T
    getComponent: () => React.FC
    setComponent: (component: React.FC) => T
    getType: () => string
    setProps: (props: object) => T,
    getProps: () => object,
    setProp: (key: string, value: string) => T
}

export interface FieldInterface {
    validator: ValidatorFunction
    errorMessage: string
    value: any
    required: boolean
    rendered: boolean
    setValidator: (validator: ValidatorFunction) => Field
    validate: (value: any) => boolean
    setError: (error: string) => void
    getError: () => string
    setRequired: (required: boolean) => Field
    isRequired: () => boolean
    setRendered: (rendered: boolean) => Field
    isRendered: () => boolean
}

export interface ContainerInterface {
    fields: Array<Field>
    addField: (field: Field) => Container
    addFields: (fields: Array<Field>) => Container
    getFields: () => Array<Field>
}

type SetErrorFunction = (message: string) => void;
type ValidatorFunction = (value: string, setError: SetErrorFunction) => void;
export class Field implements FieldInterface, ElementInterface<Field> {
    required: boolean = false;
    rendered: boolean = true;
    label: string;
    name: string;
    component: React.FC
    type: string = "field"
    validator: ValidatorFunction = (value, setError) => null;
    errorMessage: string = null;
    value: any = null;
    props: any = {};
    getLabel = () => {
        return this.label;
    }
    setLabel = (label: string) => {
        this.label = label;
        return this;
    }
    setValidator = (validator: ValidatorFunction) => {
        this.validator = validator;
        return this;
    }
    getName = () => this.name;

    setName = (name: string) => {
        this.name = name;
        return this;
    }

    validate = (value: any) => {
        this.setError(null);
        this.validator(value, this.setError);
        if (this.getError()) {
            return false;
        } else {
            return true;
        }
    };

    setError = (error: string) => {
        this.errorMessage = error;
    }

    getError = () => this.errorMessage;

    getComponent = () => this.component

    setComponent = (component: React.FC) => {
        this.component = component;
        return this;
    }
    getType = () => this.type;

    setProps = (props: object) => {
        this.props = props;
        return this;
    }
    getProps = () => this.props;
    setProp = (key: string, value: string) => {
        this.props[key] = value;
        return this;
    }
    setRequired = (required: boolean = true) => {
        this.required = required;
        return this;
    };
    isRequired = () => this.required;
    setRendered = (rendered: boolean = true) => {
        this.rendered = rendered;
        return this;
    };
    isRendered = () => this.rendered;
}

export class Container implements ContainerInterface, ElementInterface<Container> {
    fields: Field[] = [];
    label: string;
    name: string;
    component: React.FC
    type: string = "container"
    props: any = {};
    getLabel = () => this.name;

    setLabel = (label: string) => {
        this.label = label;
        return this;
    };
    getName = () => this.name;
    setName = (name: string) => {
        this.name = name;
        return this;
    };
    getComponent = () => this.component

    setComponent = (component: React.FC) => {
        this.component = component;
        return this;
    }

    addField = (field: Field) => {
        this.fields.push(field);
        return this;
    };
    addFields = (fields: Field[]) => {
        this.fields.concat(fields);
        return this;
    };

    getFields = () => this.fields;
    getType = () => this.type;
    setProps = (props: object) => {
        this.props = props;
        return this;
    }
    getProps = () => this.props;
    setProp = (key: string, value: string) => {
        this.props[key] = value;
        return this;
    }
}

export function createContainer(component: React.FC = GenericContainer, name: string = null) {
    let container = new Container();
    container.setComponent(component);
    container.setName(name);
    return container;
}
type FormInputType = "text" | "password" | "select" | "date" | "textarea";

export function createField(component: React.FC | FormInputType, name: string) {
    if (!name) {
        throw new Error("There is a field without a name");
    }

    let field = new Field();
    if (typeof component === "string") {
        switch (component) {
            case "textarea":
                throw new Error("Textarea is not implemented");
                break;
            default:
                field.setProp("type", component);
        }
        component = GenericField;
    }

    if (typeof component === "function") {
        field.setComponent(component);
    } else {
        throw new Error("The component that was provided is not valid.");
    }

    field.setName(name);
    return field;
}