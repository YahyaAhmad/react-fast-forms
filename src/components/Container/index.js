import React, { useEffect, useContext } from "react";
import { FormContext } from "Form";

const Container = ({ children, name, delta }) => {
  const formContextValues = useContext(FormContext);
  const { onChange, data, onDelete } = formContextValues;

  // Check props.
  useEffect(() => {
    if (!name || !delta) {
      throw new Error("Name and delta should be set.");
    }
  }, []);

  // Remove container value.
  useEffect(() => {
    return () => {
      onDelete.current(name, delta);
    };
  }, []);

  const getData = () => {
    let containerData = data[name] ? data[name] : {};
    return containerData[delta] ? containerData[delta] : {};
  };

  const handleChange = (fieldName, value) => {
    let newData = { ...data[name] };
    newData[delta] = { ...getData() };
    newData[delta][fieldName] = value;
    onChange.current(name, newData);
  };

  const onChangeContainer = React.useRef(handleChange);

  useEffect(() => {
    onChangeContainer.current = handleChange;
  });

  const containerContextValues = {
    ...formContextValues,
    onChange: onChangeContainer,
    data: getData()
  };

  return (
    <FormContext.Provider value={containerContextValues}>
      {children}
    </FormContext.Provider>
  );
};

export default Container;
