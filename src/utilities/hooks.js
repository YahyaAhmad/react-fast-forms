import { useContext } from "react";
import { F, FieldContext } from "components/Field";

export const useField = () => {
  const { onChange, value, name, setError } = useContext(FieldContext);
  return { onChange, value, name, setError };
};
