import { ContainerInterface, Field, Container } from './builder';
import * as React from 'react';
import PropTypes from "prop-types";
interface FastFormProps {
    container: ContainerInterface;
    onSubmit?: (data: object) => void;
    debug?: boolean;
    onChange?: (name: string, value: any) => void;
    attributes?: React.HTMLAttributes<Element>;
    defaultValues: Data;
    submitLabel: string;
}
interface FormProviderInterface {
    data: Data;
    onChange: (name: string, value: any) => void;
    allFields: Array<Field>;
}
export declare type Data = Record<string, any>;
export declare const FormContext: React.Context<FormProviderInterface>;
declare const Form: {
    (props: FastFormProps): JSX.Element;
    defaultProps: {
        onSubmit: (data: Record<string, any>) => void;
        onChange: (name: string, value: any) => void;
        debug: boolean;
        container: any;
        defaultValues: {};
        submitLabel: string;
    };
    propTypes: {
        container: PropTypes.Validator<Container>;
    };
};
export default Form;
