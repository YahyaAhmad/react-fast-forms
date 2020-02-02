import React from "react";
import { useField } from "utilities/hooks";

const GenericField = ({ type, ...rest }) => {
  const { onChange, value, name, setError } = useField();
  return type == "textarea" ? (
    <textarea
      {...rest}
      name={name}
      value={value}
      onChange={e => onChange(e.target.value)}
    ></textarea>
  ) : (
    <input
      {...rest}
      type={type}
      value={value ? value : ""}
      name={name}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default GenericField;
