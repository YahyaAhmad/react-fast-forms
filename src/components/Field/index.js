import React, { useEffect, useContext, useState, useMemo } from "react";
import GenericField from "components/GenericField";
import { FormContext } from "Form";
import { forEach } from "lodash";
import { validate, classNames } from "utilities";
export const FieldContext = React.createContext(null);
const Field = ({
  label,
  component,
  name,
  onChange,
  fieldClassName,
  defaultValue,
  required = false,
  validators = {},
  errorMessages = {},
  ...rest
}) => {
  const formContextData = useContext(FormContext);
  const {
    data,
    register,
    unregister,
    errors,
    setError,
    clearErrors,
    renderErrorMessage,
    renderField,
    validateOnChange,
    handleErrorMessage,
  } = formContextData;
  const parentOnChange = formContextData.onChange;
  const [initialized, setInitialized] = useState(false);
  const allValidators = { required, ...validators };
  let FieldComponent,
    fieldProps = {};
  const handleChange = (value, fieldName = name) => {
    parentOnChange.current(fieldName, value);
    if (onChange) {
      onChange(value);
    }
  };
  // Register the validator.
  useEffect(() => {
    // Register.
    register({
      name,
      validators: allValidators,
      messages: errorMessages,
    });
  }, []);

  // Register the validator.
  useEffect(() => {
    // Register.
    register({
      name,
      validators: allValidators,
      messages: errorMessages,
    });
  }, [required]);

  // Set the default value.
  useEffect(() => {
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
      fieldProps = { ...rest, type: component };
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
    setError: () => null,
  };
  return (
    <div
      className={classNames([
        "form-Field",
        `form-Field-${name}`,
        fieldClassName,
      ])}
    >
      {renderField(
        errors[name] && renderErrorMessage(errors[name]),
        label && (
          <label className="form-Field-Label" htmlFor={name}>
            {label}
          </label>
        ),
        <FieldContext.Provider value={fieldContextValues}>
          <FieldComponent {...fieldProps} />
        </FieldContext.Provider>
      )}
    </div>
  );
};
export default Field;
