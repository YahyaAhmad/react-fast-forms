import { ContainerInterface, Container } from './builder';
import * as React from 'react';
import PropTypes from "prop-types";
interface FastFormProps {
    container: ContainerInterface;
    onSubmit?: (data: object) => void;
    debug?: boolean;
    onChange?: (name: string, value: any) => void;
    attributes?: React.HTMLAttributes<Element>;
}
export declare type Data = Record<string, any>;
export declare const FormContext: React.Context<any>;
declare const Form: {
    (props: FastFormProps): JSX.Element;
    defaultProps: {
        onSubmit: (data: Record<string, any>) => void;
        onChange: (name: string, value: any) => void;
        debug: boolean;
        container: any;
    };
    propTypes: {
        container: PropTypes.Validator<Container>;
    };
};
export default Form;
