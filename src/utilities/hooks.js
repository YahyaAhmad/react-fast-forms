import { useContext } from "react";
import { FieldContext } from "components/Field";
import { FormContext } from "Form";

export const useField = () => {
  const { onChange, value, name, setError } = useContext(FieldContext);
  return { onChange, value, name, setError };
};

export const useData = () => {
  const { data } = useContext(FormContext);
  return data;
};
