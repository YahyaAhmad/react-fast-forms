import React from 'react'
import { useField } from '../hooks'

const GenericField = () => {
    const [{ name, value, onChange, required }, { type }] = useField({ type: "text" });
    return (
        <input type={type} name={name} value={value || ""} onChange={e => onChange(e.target.value)} />
    )
}

export default GenericField
