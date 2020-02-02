import React, { useContext, useEffect, useState, useCallback } from "react";
import { FormContext } from "Form";
import PropType from "prop-types";
import { validate } from "utilities/";
import { forEach } from "lodash";

const Container = ({ name, delta, children }) => {
  const [containerErrors, setContainerErrors] = useState({});
  const [containerValidators, setContainerValidators] = useState([]);
  const formContextValues = useContext(FormContext);
  const {
    onChange,
    data,
    register,
    handleErrorMessage,
    renderAllMessages,
    removeErrorsOnChange
  } = formContextValues;

  useEffect(() => {
    // Register a function that validates all the container values.
    register({
      name: `${name}-${delta ? delta : 0}`,
      validators: { function: validateContainer },
      messages: {}
    });
  }, [containerValidators, data]);

  useEffect(() => {
    // Remove errors on change.
    if (removeErrorsOnChange) {
      setContainerErrors({});
    }
  }, [data]);

  const setError = useCallback(
    (name, errorMessage) => {
      let newErrors = {};
      newErrors[name] = errorMessage;
      setContainerErrors(prev => ({ ...prev, ...newErrors }));
    },
    [containerErrors]
  );

  const handleContainerValidators = (
    fieldValidators,
    fieldName,
    errorMessages
  ) => {
    let validated = true;
    forEach(fieldValidators, (rule, typeOfValidator) => {
      if (!validate(resloveData()[fieldName], rule, typeOfValidator)) {
        setError(fieldName, handleErrorMessage(typeOfValidator, errorMessages));
        validated = false;
        return false;
      }
    });
    return validated;
  };

  const handleAllContainerValidators = () => {
    let validated = true;

    forEach(containerValidators, validatorObject => {
      const fieldName = validatorObject.name;
      const fieldValidators = validatorObject.validators;
      const errorMessages = validatorObject.messages;
      const fieldValidated = handleContainerValidators(
        fieldValidators,
        fieldName,
        errorMessages
      );
      if (!fieldValidated) {
        validated = false;
      }
      if (!renderAllMessages) {
        return false;
      }
    });

    return validated;
  };

  const validateContainer = () => {
    const validiated = handleAllContainerValidators();
    if (validiated) {
      setContainerErrors({});
      return true;
    } else {
      return false;
    }
  };

  /**
   * Gets the data of the container.
   *
   */
  const resloveData = () => {
    const containerData = data[name] ? data[name] : {};
    if (typeof delta === "number") {
      return containerData[delta] ? containerData[delta] : containerData;
    } else {
      return containerData;
    }
  };

  const handleRegister = validatorObject => {
    let newValidators = {};
    newValidators[validatorObject.name] = validatorObject;
    setContainerValidators(prev => ({ ...prev, ...newValidators }));
  };

  const handleChange = (childName, value) => {
    if (removeErrorsOnChange) {
      setContainerErrors({});
    }

    let prevData = data[name] ? data[name] : {};
    let newData = {};
    if (typeof delta === "number") {
      newData[delta] = prevData[delta] ? prevData[delta] : {};
      newData[delta][childName] = value;
    } else {
      newData[childName] = value;
    }
    onChange(name, { ...prevData, ...newData });
  };

  const containerContextValues = {
    ...formContextValues,
    onChange: handleChange,
    data: resloveData(),
    register: handleRegister,
    errors: containerErrors,
    setError,
    clearErrors: () => setContainerErrors({})
  };
  return (
    <FormContext.Provider value={containerContextValues}>
      {children}
    </FormContext.Provider>
  );
};

Container.propTypes = {
  name: PropType.string.isRequired
};

export default Container;
