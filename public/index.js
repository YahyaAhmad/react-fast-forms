import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Field, Form, Submit, Container, useField } from "index";

const FormExample = () => {
  const [itemsDelta, setItemsDelta] = useState([]);
  const [renderText2, SetRenderText2] = useState(false);
  const [data, setData] = useState({});
  const validation = (values, setError) => {
    if (values["text"] == "error") {
      setError("text", "Error is not allowed");
      return false;
    }

    if (values["canAnswer"]) return true;
  };

  const handleRender = () => {
    SetRenderText2(!renderText2);
  };

  return (
    <Form
      onSubmit={(data) => console.log(data)}
      validateForm={validation}
      onFormChange={(data) => setData(data)}
      debug
    >
      <Field component="text" name="text" label="Test" />
      {data.text == "text" && (
        <Field component="text" name="text44" label="Test" />
      )}
      {renderText2 && <Field component="text" name="text2" label="Test" />}
      <button onClick={handleRender}>Render Text 2</button>
      <button>Submit</button>
    </Form>
  );
};

ReactDOM.render(<FormExample />, document.getElementById("react-fast-forms"));
