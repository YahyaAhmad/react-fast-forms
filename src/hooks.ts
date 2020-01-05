import { FormContext } from './Form';
import { FieldContext } from './elements/FieldManager';
import { useContext, useState } from "react"
import { ContainerContext } from "./elements/ContainerManager"
import { merge } from 'lodash';


/**
 * The field name
 */
type FieldName = string;
type Props = any;
type Render = React.ReactNode;
interface InputProps {
    name: string
    value: any
    required: boolean
    onChange: (value: string) => void
}

type ContainerHook = (defaultValues?: Props) => [Render, Props]

type FieldHook = (defaultValues?: Props) => [
    InputProps,
    Props
]


/**
 * 
 * @param defaultValues The default values 
 * 
 * @returns An array 
 */
export const useContainer: ContainerHook = (defaultValues: Props = {}) => {
    const { render, containerProps } = useContext(ContainerContext);
    let newProps = merge(defaultValues, containerProps);
    return [render, newProps];
}

/**
 * 
 * @param defaultValues The default values 
 * 
 * @returns An array 
 */
export const useField: FieldHook = (defaultValues: Props = {}) => {
    const { fieldProps, name } = useContext(FieldContext);
    const { onChange, data, allFields } = useContext(FormContext);

    const handleChange = (value: any, fieldName: string = name) => {
        let dependentFields = allFields.filter(field => field.getDependency() == name);
        dependentFields.forEach(field => {
            let replacedField = field.replaceDependencies(value);
            let replacedValue = replacedField.getDefaultValue();
            onChange(field.getName(), replacedValue);
        });
        onChange(fieldName, value);
    }

    let newProps = merge(defaultValues, fieldProps);
    return [{ value: data[name], onChange: handleChange, required: false, name }, newProps];
}
