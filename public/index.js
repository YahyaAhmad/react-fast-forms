import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Field, Form, Submit, Container, useField } from "index";

const FormExample = () => {
  const [itemsDelta, setItemsDelta] = useState([]);
  const [someState, setSomeState] = useState(false);

  const renderItems = () => {
    return itemsDelta.map((delta) => (
      <Container key={delta} name="section" delta={delta}>
        <Field component="text" name="test1" label="Test1" />
        <Field component="text" name="test2" label="Test2" />
        <button
          type="button"
          onClick={() =>
            setItemsDelta(itemsDelta.filter((iDelta) => iDelta != delta))
          }
        >
          Delete
        </button>
      </Container>
    ));
  };

  return (
    <Form onSubmit={(data) => console.log(data)} debug>
      <Field component="text" name="text" label="Test" required={someState} />
      <button onClick={() => setSomeState(!someState)}>Sta</button>
      <button>Submit</button>
    </Form>
  );
};

ReactDOM.render(<FormExample />, document.getElementById("react-fast-forms"));
