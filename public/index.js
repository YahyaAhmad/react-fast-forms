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
        <Container key={i} delta={i} name="section">
          <Field required label="Sur.Name" component="text" name="surName" />
          <Field
            validators={{ pattern: /^test/ }}
            errorMessages={{
              pattern: "Something is wrong!"
            }}
            label="Sur.Name 2"
            component="text"
            name="surName2"
          />
        </Container>
      );
    }
    return fields;
  };

  return (
    <Form
      onSubmit={handleSubmit}
    >
      <Field name="Tet" required component="text"/>
      <Field name="Tet2" required component="text"/>
      <Submit label="Submit" />
    </Form>
  );
};

ReactDOM.render(<FormExample />, document.getElementById("react-fast-forms"));
