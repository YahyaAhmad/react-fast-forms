import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Field, Form, Submit, Container, useField } from "index";

const FormExample = () => {
  const [itemsDelta, setItemsDelta] = useState([]);

  const validation = (values, setError) => {
    if (values["text"] == "error") {
      setError("text", "Error is not allowed");
      return false;
    }
    return true;
  };

  return (
    <Form onSubmit={(data) => console.log(data)} validateForm={validation}>
      <Field component="text" name="text" label="Test" />
      <button>Submit</button>
    </Form>
  );
};

ReactDOM.render(<FormExample />, document.getElementById("react-fast-forms"));
