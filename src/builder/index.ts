import { mapValues } from 'lodash';
import { isValidElement } from "react";
import GenericContainer from "../elements/GenericContainer";
import GenericField from "../elements/GenericField";
import { Data } from "../Form";

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
    defaultValue: any
    required: boolean
    rendered: boolean
    ignored: boolean
    dependency: string
    setValidator: (validator: ValidatorFunction) => Field
    validate: (value: any) => boolean
    setError: (error: string) => void
    getError: () => string
    setRequired: (required: boolean) => Field
    isRequired: () => boolean
    setRendered: (rendered: boolean) => Field
    isRendered: () => boolean
    setIgnored: (ignored: boolean) => Field
    isIgnored: () => boolean
    setDefaultValue: (value: any) => Field
    getDefaultValue: () => any
    setDependency: (dependency: string) => Field
    getDependency: () => string
    replaceDependencies: (value: any, object: Data) => Field
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
    ignored: boolean;
    required: boolean = false;
    rendered: boolean = true;
    label: string;
    name: string;
    component: React.FC
    type: string = "field"
    validator: ValidatorFunction = (value, setError) => null;
    errorMessage: string = null;
    defaultValue: any = null;
    props: any = {};
    dependency: string;
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

    isIgnored = () => this.ignored;

    setIgnored = (ignored: boolean = true) => {
        this.ignored = ignored;
        return this;
    };
    setDefaultValue = (value: any) => {
        this.defaultValue = value;
        return this;
    }
    getDefaultValue = () => this.defaultValue

    setDependency = (dependency: string) => {
        this.dependency = dependency;
        return this;
    }

    getDependency = () => this.dependency
    replaceDependencies = (replace: any, object: Data = null) => {
        let defaultValue;
        if (object === null) {
            object = { ...this.props };
            // Replace default value.
            if (this.defaultValue) {
                defaultValue = this.defaultValue.replace(`{${this.getDependency()}}`, replace);
            }
        }

        object = mapValues(object, (value, key) => {
            if (typeof value === "object") {
                return this.replaceDependencies(replace, value);
            } else if (typeof value === "string") {
                let newValue = value.replace(`{${this.getDependency()}}`, replace);
                return newValue;
            }
        });
        let clone = this.clone();
        clone.setDefaultValue(defaultValue);
        clone.setProps(object);
        return clone;
    }
    public clone(): Field {
        var cloneObj = new Field();
        cloneObj.setName(this.getName());
        cloneObj.setRequired(this.isRequired());
        cloneObj.setRendered(this.isRendered());
        cloneObj.setIgnored(this.isIgnored());
        cloneObj.setValidator(this.validator);
        cloneObj.setLabel(this.getLabel());
        cloneObj.setComponent(this.getComponent());
        return cloneObj;
    }

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
        this.fields = this.fields.concat(fields);
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
type FormInputType = "text" | "password" | "select" | "date" | "textarea" | "hidden";

export function createField(component: React.FC | FormInputType, name: string) {
    if (!name) {
        throw new Error("There is a field without a name");
    }

    let field = new Field();
    if (typeof component === "string") {
        switch (component) {
            case "textarea":
            case "select":
                field.setProp("tag", component);
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