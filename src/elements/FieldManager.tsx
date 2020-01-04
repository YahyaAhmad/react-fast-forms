import * as React from 'react'
import { FieldInterface, Field } from '../builder';
import { FormContext } from '../Form';

export const FieldContext = React.createContext(null);

interface FieldManagerProps {
    field: Field
    error: string
}

const FieldManager = ({ field, error }: FieldManagerProps) => {
    const fieldProps = field.getProps();
    const label = field.getLabel();
    const FieldComponent = field.getComponent();
    const name = field.getName();

    let classNames = ["field-container", "field-" + name];

    return (
        <FieldContext.Provider value={{ fieldProps, name }}>
            <div className={classNames.join(" ")}>
                {error && <div>{error}</div>}
                {label && <label htmlFor={name}>{label}</label>}
                <FieldComponent />
            </div>
        </FieldContext.Provider>
    )
}

export default FieldManager
