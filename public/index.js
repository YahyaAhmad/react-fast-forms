import React from "react";
import ReactDOM from "react-dom";
import { Field, Form, Submit } from "index";

const FormExample = () => {
  return (
    <Form validateOnChange>
      <Field label="Title" component="text" name="title" required />
      <Field label="Sur.Name" component="text" name="surName" />
      <Submit label="Submit" />
    </Form>
  );
};

ReactDOM.render(<FormExample />, document.getElementById("react-fast-forms"));
