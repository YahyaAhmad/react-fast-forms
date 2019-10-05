import { createField } from "../src/builder/FieldElement";
import { createContainer } from "../src/builder/ContainerElement";
import TestRenderer from "react-test-renderer";
import { Form } from "../src";
import { GenericContainer } from "../src";
import { GenericField } from "../src";
import React from "react";

describe("Field Element", () => {
  it("Field validator works as an object", () => {
    let field = createField(null, "someName");
    field.setValidator((value, setError) => {
      if (value == "error") {
        setError("There is an error");
      }
    });
    // Check with a correct value.
    field.validate("not error");
    expect(field.hasError()).toEqual(false);
    // Check with an incorrect value.
    field.validate("error");
    expect(field.hasError()).toEqual(true);
    // Check if the message is right.
    expect(field.getErrorMessage()).toEqual("There is an error");
  });

  it("Field dependency works", () => {
    let dependentField = createField(null, "dependent");
    dependentField.setDependency("dependency");
    dependentField.setLabel("My {dependency}");
    let newProps = dependentField.replaceDependencies("Field");
    expect(newProps.label).toEqual("My Field");
  });
});

describe("Form", () => {
  let mainContainer = createContainer(GenericContainer).setLabel(
    "My Container"
  );
  let field1 = createField(GenericField, "field1").setProp(
    "className",
    "field1"
  );
  let field2 = createField(GenericField, "field2")
    .setLabel("Test")
    .setRequired();
  mainContainer.addFields([field1, field2]);

  it("should render expectedly", () => {
    const form = TestRenderer.create(<Form fields={mainContainer} />).toJSON();
    expect(form).toMatchSnapshot();
  });

  it("Render the main container with 2 fields", () => {
    const form = TestRenderer.create(<Form fields={mainContainer} />);
    expect(form.toJSON().children[1].children.length).toEqual(2);
  });
  it("Should not submit when there is a field that is required but empty", () => {
    const form = TestRenderer.create(
      <Form onSubmit={values => (submitted = true)} fields={mainContainer} />
    );
    let submitted = false;
    const instance = form.getInstance();
    instance.handleSubmit();
    expect(submitted).toEqual(false);
  });
  it("Should submit if every required field is satisfied", () => {
    const form = TestRenderer.create(
      <Form onSubmit={values => (submitted = true)} fields={mainContainer} />
    );
    let submitted = false;
    const instance = form.getInstance();
    instance.handleChange("some value", "field2");
    instance.handleSubmit();
    expect(submitted).toEqual(true);
  });

  it("Field validator works in a form", () => {
    let submitted = false;

    let mainContainer = createContainer(GenericContainer).setLabel(
      "My Container"
    );
    let field1 = createField(GenericField, "normalField");
    let field2 = createField(GenericField, "customRequiredField").setValidator(
      (value, setError) => {
        if (value == "error value") {
          setError("There is an error");
        }
      }
    );
    mainContainer.addFields([field1, field2]);

    const form = TestRenderer.create(
      <Form onSubmit={value => (submitted = true)} fields={mainContainer} />
    );
    const instance = form.getInstance();
    instance.handleChange("some value", "normalField");
    instance.handleSubmit();
    expect(submitted).toEqual(true);
    instance.handleChange("error value", "customRequiredField");
    submitted = false;
    instance.handleSubmit();
    expect(submitted).toEqual(false);
    instance.handleChange("success value", "customRequiredField");
    instance.handleSubmit();
    expect(submitted).toEqual(true);
  });

  it("Data should change as expected", () => {
    const form = TestRenderer.create(
      <Form onSubmit={values => (submitted = true)} fields={mainContainer} />
    );
    const instance = form.getInstance();
    instance.handleChange("some value", "field1");
    expect(instance.state.data).toEqual({ field1: "some value" });
    instance.handleChange("other value", "field2");
    expect(instance.state.data).toEqual({
      field1: "some value",
      field2: "other value"
    });
  });

  it("Field A should not render when it is depndent on field B when its value is not defined", () => {
    let dependentField = createField(GenericField, "dependentField")
      .setLabel("Label is depndent on {field1}")
      .setProp("className", "dependent-field")
      .setDependency("field1");
    mainContainer.addField(dependentField);
    const form = TestRenderer.create(
      <Form onSubmit={values => (submitted = true)} fields={mainContainer} />
    );
    const root = form.root;
    let mainContainerRoot = form.root.findByProps({
      className: "form-container"
    });
    expect(
      mainContainerRoot.findAllByProps({ className: "dependent-field" })[0]
    ).toBeUndefined();
    form.getInstance().handleChange("some value", "field1");
    expect(
      mainContainerRoot.findAllByProps({ className: "dependent-field" })[0]
    ).toBeDefined();
  });

  it("Should omit empty or invalid values on submit", () => {
    let submittedData = {};
    let container = createContainer(GenericContainer).addField(
      createField(GenericField, "field1")
    );
    const form = TestRenderer.create(
      <Form onSubmit={values => (submittedData = values)} fields={container} />
    );
    const instance = form.getInstance();
    instance.handleChange("", "field1");
    instance.handleChange({}, "field2");
    instance.handleChange([], "field3");
    instance.handleChange(null, "field4");
    instance.handleChange(false, "correctValue1");
    instance.handleChange("some value", "correctValue2");

    expect(instance.state.data).toEqual({
      field1: "",
      field2: {},
      field3: [],
      field4: null,
      correctValue1: false,
      correctValue2: "some value"
    });
    instance.handleSubmit();
    expect(submittedData).toEqual({
      correctValue1: false,
      correctValue2: "some value"
    });
    instance.handleChange;
  });
});
