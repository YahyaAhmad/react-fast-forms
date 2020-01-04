/// <reference types="react" />
export interface ElementInterface<T> {
    label: string;
    name: string;
    component: React.FC;
    type: string;
    props: any;
    getLabel: () => string;
    setLabel: (label: string) => T;
    getName: () => string;
    setName: (name: string) => T;
    getComponent: () => React.FC;
    setComponent: (component: React.FC) => T;
    getType: () => string;
    setProps: (props: object) => T;
    getProps: () => object;
    setProp: (key: string, value: string) => T;
}
export interface FieldInterface {
    validator: ValidatorFunction;
    errorMessage: string;
    value: any;
    required: boolean;
    rendered: boolean;
    setValidator: (validator: ValidatorFunction) => Field;
    validate: (value: any) => boolean;
    setError: (error: string) => void;
    getError: () => string;
    setRequired: (required: boolean) => Field;
    isRequired: () => boolean;
    setRendered: (rendered: boolean) => Field;
    isRendered: () => boolean;
}
export interface ContainerInterface {
    fields: Array<Field>;
    addField: (field: Field) => Container;
    addFields: (fields: Array<Field>) => Container;
    getFields: () => Array<Field>;
}
declare type SetErrorFunction = (message: string) => void;
declare type ValidatorFunction = (value: string, setError: SetErrorFunction) => void;
export declare class Field implements FieldInterface, ElementInterface<Field> {
    required: boolean;
    rendered: boolean;
    label: string;
    name: string;
    component: React.FC;
    type: string;
    validator: ValidatorFunction;
    errorMessage: string;
    value: any;
    props: any;
    getLabel: () => string;
    setLabel: (label: string) => this;
    setValidator: (validator: ValidatorFunction) => this;
    getName: () => string;
    setName: (name: string) => this;
    validate: (value: any) => boolean;
    setError: (error: string) => void;
    getError: () => string;
    getComponent: () => import("react").FC<{}>;
    setComponent: (component: import("react").FC<{}>) => this;
    getType: () => string;
    setProps: (props: object) => this;
    getProps: () => any;
    setProp: (key: string, value: string) => this;
    setRequired: (required?: boolean) => this;
    isRequired: () => boolean;
    setRendered: (rendered?: boolean) => this;
    isRendered: () => boolean;
}
export declare class Container implements ContainerInterface, ElementInterface<Container> {
    fields: Field[];
    label: string;
    name: string;
    component: React.FC;
    type: string;
    props: any;
    getLabel: () => string;
    setLabel: (label: string) => this;
    getName: () => string;
    setName: (name: string) => this;
    getComponent: () => import("react").FC<{}>;
    setComponent: (component: import("react").FC<{}>) => this;
    addField: (field: Field) => this;
    addFields: (fields: Field[]) => this;
    getFields: () => Field[];
    getType: () => string;
    setProps: (props: object) => this;
    getProps: () => any;
    setProp: (key: string, value: string) => this;
}
export declare function createContainer(component?: React.FC, name?: string): Container;
declare type FormInputType = "text" | "password" | "select" | "date" | "textarea";
export declare function createField(component: React.FC | FormInputType, name: string): Field;
export {};