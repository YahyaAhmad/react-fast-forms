import React, { useState, useCallback, useEffect } from "react";
import PropTypes, { any, object, element, node } from "prop-types";
import { forEach, pickBy, omit, remove, omitBy } from "lodash";
import { validate, isNotValid } from "./utilities";
export const FormContext = React.createContext(null);
const defaultField = (error, label, field) => (
  <>
    {error}
    {label}
    {field}
  </>
);
const Form = ({
  onSubmit = () => null,
  className,
  renderField = defaultField,
  defaultValues = {},
  renderErrorMessage = (message) => (
    <div className="form-ErrorMessage">{message}</div>
  ),
  requiredErrorMessage = "This field is required",
  renderAllMessages = false,
  removeErrorsOnChange = false,
  omitInvalidValues = false,
  children,
  validateForm = (values) => true,
  onFormChange = () => null,
  debug = false,
}) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [validators, setValidators] = useState({});
  const [lastUnregister, setLastUnregister] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (lastUnregister) {
      let newData = { ...data };
      newData = omitBy(newData, (value, key) => key == lastUnregister);
      setData(newData);
      setLastUnregister(null);
    }
  }, [lastUnregister]);

  const setError = useCallback(
    (name, errorMessage) => {
      let newErrors = {};
      newErrors[name] = errorMessage;
      setErrors((prev) => ({ ...prev, ...newErrors }));
    },
    [errors]
  );
  const handleChange = useCallback(
    (name, value) => {
      if (value === undefined && defaultValues[name]) {
        return;
      }
      if (removeErrorsOnChange) {
        setErrors({});
      }
      let newData = {};
      newData[name] = value;
      setData((prev) => ({ ...prev, ...newData }));
    },
    [data]
  );
  useEffect(() => {
    onFormChange(data);
  }, [data]);

  const handleErrorMessage = (typeOfValidator, errorMessages) => {
    const errorMessage = errorMessages[typeOfValidator];
    switch (typeOfValidator) {
      case "required":
        return requiredErrorMessage;
      default:
        return errorMessage
          ? errorMessage
          : `Default error message of type ${typeOfValidator}`;
    }
  };

  const handleValidators = (fieldValidators, fieldName, errorMessages) => {
    let validated = true;
    forEach(fieldValidators, (rule, typeOfValidator) => {
      if (!validate(data[fieldName], rule, typeOfValidator)) {
        setError(fieldName, handleErrorMessage(typeOfValidator, errorMessages));
        validated = false;
        return false;
      }
    });
    return validated;
  };
  const handleAllValidators = useCallback(
    (validators) => {
      let validated = true;
      forEach(validators, (validatorObject) => {
        const fieldName = validatorObject.name;
        const fieldValidators = validatorObject.validators;
        const errorMessages = validatorObject.messages;
        const fieldValidated = handleValidators(
          fieldValidators,
          fieldName,
          errorMessages
        );
        if (!fieldValidated) {
          validated = false;
        }
        if (!renderAllMessages && !fieldValidated) {
          return false;
        }
      });
      return validated;
    },
    [data]
  );
  const handleSubmit = useCallback(
    (e) => {
      // Clear errors.
      setErrors({});
      // Prevent the from from refreshing.
      e.preventDefault();
      // Check and handle all validators.
      let validated = handleAllValidators(validators);
      // Call the global validate function.
      if (validated) {
        validated = validateForm(data, setError);
      }
      // Pass the data to the onSubmit prop if there is no errors.
      if (validated) {
        let dataToSubmit = { ...data };
        if (omitInvalidValues) {
          // Remove any invalid value.
          dataToSubmit = pickBy(dataToSubmit, (value) => !isNotValid(value));
        }
        onSubmit(dataToSubmit);
      }
    },
    [errors, data, validators]
  );

  /**
   * Lets Field components register their validators
   *
   */
  const register = (validatorObject) => {
    let newValidators = {};
    newValidators[validatorObject.name] = validatorObject;
    setValidators((prev) => ({ ...prev, ...newValidators }));
  };
  const handleUnregister = (name) => {
    let newValidators = { ...validators };
    newValidators = omit(newValidators, name);
    setValidators(newValidators);

    // Remove the value.
    setLastUnregister(name);
  };
  const handleDelete = (name, delta) => {
    let newData = { ...data };
    newData[name] = omit(newData[name], delta);
    setData(newData);
  };
  const onDelete = React.useRef(handleDelete);
  const onChange = React.useRef(handleChange);
  const unregister = React.useRef(handleUnregister);
  unregister.current = handleUnregister;
  onDelete.current = handleDelete;
  onChange.current = handleChange;

  const formContextValues = {
    onChange: onChange,
    onDelete: onDelete,
    data,
    errors,
    setError,
    removeErrorsOnChange,
    requiredErrorMessage,
    handleErrorMessage,
    renderField,
    renderAllMessages,
    clearErrors: () => setErrors({}),
    validators,
    handleValidators,
    register,
    unregister: unregister.current,
    renderErrorMessage,
  };
  // Debug the changes on the data.
  useEffect(() => {
    if (debug) {
      console.log(data);
    }
  }, [data]);
  // Set the default values.
  useEffect(() => {
    setData(defaultValues);
  }, []);
  return (
    <FormContext.Provider value={formContextValues}>
      <form
        onSubmit={handleSubmit}
        className={["form-MainForm", className].join(" ")}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};
Form.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  debug: PropTypes.bool,
  renderField: PropTypes.func,
  renderErrorMessage: PropTypes.func,
  requiredErrorMessage: PropTypes.string,
  renderAllMessages: PropTypes.bool,
  validateOnChange: PropTypes.bool,
};
export default Form;
