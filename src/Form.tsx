import { ContainerInterface, Field, Container } from './builder';
import FieldManager from './elements/FieldManager';
import * as React from 'react';
import PropTypes, { element } from "prop-types";
import ContainerManager from './elements/ContainerManager';
import { omit } from 'lodash';

interface FastFormProps {
    container: ContainerInterface
    onSubmit?: (data: object) => void
    debug?: boolean,
    onChange?: (name: string, value: any) => void
    attributes?: React.HTMLAttributes<Element>
}

export type Data = Record<string, any>

export const FormContext = React.createContext(null);

let addedFields: Array<Field> = [];

const Form = (props: FastFormProps) => {
    const { container, debug, onSubmit, onChange, attributes } = props;
    const [data, setData] = React.useState<Data>({});
    const [errors, setErrors] = React.useState<Data>({});
    const [render, setRender] = React.useState(null);
    const elements = container.getFields();
    const handleChange = (name: string, value: any) => {
        let newData = { ...data };
        newData[name] = value;
        setData(newData);
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        let submittedData = {};
        if (submittedData = validateForm()) {
            onSubmit(submittedData);

        } else {
            throw new Error("There are errors!");
        }
    }

    const isValid = (value: any) => !(value === null || value === undefined || value === "" || value === {} || value === "{}" || value === [])

    const setError = (name: string, errorMessage: string) => {
        let newErrors = { ...errors };
        newErrors[name] = errorMessage;
        setErrors(newErrors);
    }

    const validateForm = () => {
        let valid = true;
        setErrors({});
        let submittedData = { ...data };
        addedFields.map(field => {
            const name = field.getName();
            const value = submittedData[name];
            // Check if it is required
            if (!isValid(value)) {
                if (field.isRequired()) {
                    setError(name, "This field is required");
                    valid = false;
                }
                submittedData = omit(submittedData, name);
            }


            // Check the custom validator
            if (isValid(value)) {
                if (!field.validate(value)) {
                    setError(name, field.getError());
                }

            }
        });
        return valid ? submittedData : false;
    }

    const recursiveRender = (elements: (Field | Container)[]) => {
        let renderElements: React.ReactNode;
        elements.forEach((element) => {
            if (element instanceof Container) {
                const ContainerComponent = element.getComponent();
                let children = recursiveRender(element.getFields());
                renderElements = (
                    <>
                        {renderElements}
                        <ContainerManager render={children} containerProps={element.getProps()} label={element.getLabel()}>
                            <ContainerComponent />
                        </ContainerManager>
                    </>
                )
            } else if (element instanceof Field) {
                addedFields.push(element);
                renderElements = (
                    <>
                        {renderElements}
                        <FieldManager error={errors[element.getName()]} field={element} />
                    </>
                )
            }
        });
        return renderElements;
    }

    React.useEffect(() => {
        addedFields = [];

        setRender(recursiveRender(elements));

    }, [elements, errors]);

    const formProviderValues = {
        data: data,
        onChange: handleChange,
    }

    if (debug) {
        console.log(data);
    }


    return (
        <form {...attributes}>
            <FormContext.Provider value={formProviderValues}>
                {render}
            </FormContext.Provider>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
}

Form.defaultProps = {
    onSubmit: (data: Record<string, any>) => {
        console.log("Successfully Submitted the values:");
        console.log(data);
    },
    onChange: (name: string, value: any) => { },
    debug: false,
    container: null,
}

Form.propTypes = {
    container: PropTypes.instanceOf(Container).isRequired
}

export default Form


