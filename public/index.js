import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Field, Form, Submit, Container } from "index";

const FormExample = () => {
  const [delta, setDelta] = useState(0);
  const handleSubmit = data => {
    console.log(data);
  };

  const renderFields = () => {
    let fields = [];
    for (let i = 0; i <= delta; i++) {
      fields.push(
        <Container delta={i} name="section">
          <Field required label="Sur.Name" component="text" name="surName" />
          <Field label="Sur.Name 2" component="text" name="surName2" />
        </Container>
      );
    }
    return fields;
  };

  return (
    <Form omitInvalidValues onSubmit={handleSubmit} validateOnChange>
      {renderFields()}
      <button onClick={() => setDelta(delta + 1)}>Add Fields</button>
      <Submit label="Submit" />
    </Form>
  );
};

ReactDOM.render(<FormExample />, document.getElementById("react-fast-forms"));
