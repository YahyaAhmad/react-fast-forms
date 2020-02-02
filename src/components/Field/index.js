import React, { useEffect, useContext, useState, useMemo } from "react";
import GenericField from "components/GenericField";
import { FormContext } from "Form";
import { forEach } from "lodash";
import { validate } from "utilities";
export const FieldContext = React.createContext(null);

const Field = ({
  label,
  component,
  name,
  defaultValue = "",
  required = false,
  validators = {},
  errorMessages = {},
  ...rest
}) => {
  const {
    onChange,
    data,
    register,
    errors,
    setError,
    clearErrors,
    renderErrorMessage,
    validateOnChange,
    handleErrorMessage
  } = useContext(FormContext);
  const [initialized, setInitialized] = useState(false);
  const allValidators = { required, ...validators };
  let FieldComponent,
    fieldProps = {};

  const handleChange = value => {
    onChange(name, value);
  };

  // Register the validator.
  useEffect(() => {
    // Register.
    register({
      name,
      validators: allValidators,
      messages: errorMessages
    });
  }, []);

  // Set the default value.
  useEffect(() => {
    if (typeof defaultValue === "undefined" || defaultValue === null) {
      throw new Error(
        `Default value for field "${name}" can't be undefined or null"`
      );
    }
    handleChange(defaultValue);
    setInitialized(true);
  }, []);

  switch (typeof component) {
    // If it is a react component, load the component that was given by the user.
    case "function":
      FieldComponent = component;
      // Get the rest of the props as field props.
      fieldProps = rest;
      break;
    // If a string is provided, that means that the user wants to use a default html5 input.
    case "string":
      FieldComponent = GenericField;
      // Pass the string in the field props as a type prop for the input.
      fieldProps = { type: component };
      break;
    default:
      throw new Error(
        `Invalid component supplied. Expected a string or a React Component, instead, was given ${typeof component}`
      );
  }

  // Provide the context with the desired handlers and values.
  const fieldContextValues = {
    onChange: handleChange,
    value: data[name],
    name,
    setError: () => null
  };
  return (
    <div className="form-Field">
      {errors[name] && renderErrorMessage(errors[name])}
      {label && (
        <label className="form-Field-Label" htmlFor={name}>
          {label}
        </label>
      )}

      <FieldContext.Provider value={fieldContextValues}>
        <FieldComponent {...fieldProps} />
      </FieldContext.Provider>
    </div>
  );
};

export default Field;
