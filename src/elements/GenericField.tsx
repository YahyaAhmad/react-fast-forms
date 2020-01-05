import React from 'react'
import { useField } from '../hooks'
import { omit } from 'lodash';
const GenericField = () => {
    const [{ name, value, onChange, required }, fieldProps] = useField({ type: "text", tag: "input" });
    const Tag = fieldProps.tag;
    const htmlAttributes = omit(fieldProps, 'tag', 'type');
    return (
        fieldProps.tag == "input" ?
            <input {...htmlAttributes} type={fieldProps.type} name={name} value={value || ""} onChange={e => onChange(e.target.value)} />
            :
            <Tag {...htmlAttributes} name={name} value={value || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}></Tag >
    )
}

export default GenericField
