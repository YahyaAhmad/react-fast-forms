import React from "react";
import { useField } from "utilities/hooks";

const GenericField = ({ type }) => {
  const { onChange, value, name, setError } = useField();
  return (
    <input
      type={type}
      value={value ? value : ""}
      name={name}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default GenericField;
