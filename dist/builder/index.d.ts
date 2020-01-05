/// <reference types="react" />
import { Data } from "../Form";
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
    defaultValue: any;
    required: boolean;
    rendered: boolean;
    ignored: boolean;
    dependency: string;
    setValidator: (validator: ValidatorFunction) => Field;
    validate: (value: any) => boolean;
    setError: (error: string) => void;
    getError: () => string;
    setRequired: (required: boolean) => Field;
    isRequired: () => boolean;
    setRendered: (rendered: boolean) => Field;
    isRendered: () => boolean;
    setIgnored: (ignored: boolean) => Field;
    isIgnored: () => boolean;
    setDefaultValue: (value: any) => Field;
    getDefaultValue: () => any;
    setDependency: (dependency: string) => Field;
    getDependency: () => string;
    replaceDependencies: (value: any, object: Data) => Field;
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
    ignored: boolean;
    required: boolean;
    rendered: boolean;
    label: string;
    name: string;
    component: React.FC;
    type: string;
    validator: ValidatorFunction;
    errorMessage: string;
    defaultValue: any;
    props: any;
    dependency: string;
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
    isIgnored: () => boolean;
    setIgnored: (ignored?: boolean) => this;
    setDefaultValue: (value: any) => this;
    getDefaultValue: () => any;
    setDependency: (dependency: string) => this;
    getDependency: () => string;
    replaceDependencies: (replace: any, object?: Record<string, any>) => Field;
    clone(): Field;
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
declare type FormInputType = "text" | "password" | "select" | "date" | "textarea" | "hidden";
export declare function createField(component: React.FC | FormInputType, name: string): Field;
export {};
