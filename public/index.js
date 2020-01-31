import React from "react";
import ReactDOM from "react-dom";
import { Field, Form, Submit } from "index";

const FormExample = () => {
  return (
    <Form validateOnChange>
      <Field
        required
        label="Test Field"
        validators={{
          pattern: /.+?\@\w+\.\w+/,
          minLength: 12
        }}
        errorMessages={{
          pattern: "This email is invalid",
          minLength: "Value should be more than 11"
        }}
        component={"text"}
        name="someName"
      />
      <section style={{ background: "red" }}>
        <div>Please, put a number</div>
        <Field required component="number" name="myNumber" />
      </section>
      <Submit label="Submit" />
    </Form>
  );
};

ReactDOM.render(<FormExample />, document.getElementById("react-fast-forms"));
