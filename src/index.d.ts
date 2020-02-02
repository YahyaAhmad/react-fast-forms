declare module "react-fast-forms" {
  import * as React from "react";

  interface FormProps {
    onSubmit: (data: any) => void;
    className: string;
    renderField: (
      field: React.ReactNode,
      label: React.ReactNode,
      errorMessage: React.ReactNode
    ) => React.FC;
    renderErrorMessage: (message: string) => React.ReactNode;
    requiredErrorMessage: string;
    renderAllMessages: boolean;
    removeErrorsOnChange: boolean;
    omitInvalidValues: boolean;
    debug: boolean;
  }

  interface Validators {
    required: boolean;
    pattern: RegExp;
    minLength: number;
    maxLength: number;
    function: (value: any) => boolean;
  }

  interface ErrorMessages {
    required: string;
    pattern: string;
    minLength: string;
    maxLength: string;
    function: string;
  }

  type HTML5InputTypes = "text" | "checkbox" | "textarea" | "number";

  interface FieldProps extends React.HTMLAttributes {
    label?: string;
    component: React.Component | HTML5InputTypes;
    name: string;
    className: string;
    defaultValue?: any;
    required?: boolean;
    validators?: Validators;
    errorMessages?: ErrorMessages;
  }

  interface SubmitProps {
    label: string;
    className: string;
  }

  interface FieldContext {
    onChange: (value: any) => void;
    value: any;
    name: string;
    setError: (message: string) => void;
  }

  interface ContainerProps {
    name: string;
    delta: number;
  }

  export class Form extends React.Component<FormProps> {}
  export class Field extends React.Component<FieldProps> {}
  export class Container extends React.Component<ContainerProps> {}
  export class Submit extends React.Component<SubmitProps> {}
  export function useField(): FieldContext {}
}
