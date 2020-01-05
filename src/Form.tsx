import { ContainerInterface, Field, Container } from './builder';
import FieldManager from './elements/FieldManager';
import * as React from 'react';
import PropTypes, { element } from "prop-types";
import ContainerManager from './elements/ContainerManager';
import { omit, keyBy, chain, mapValues, values, pickBy } from 'lodash';

interface FastFormProps {
    container: ContainerInterface
    onSubmit?: (data: object) => void
    debug?: boolean,
    onChange?: (name: string, value: any) => void
    attributes?: React.HTMLAttributes<Element>
    defaultValues: Data,
    submitLabel: string
}

interface FormProviderInterface {
    data: Data,
    onChange: (name: string, value: any) => void,
    allFields: Array<Field>
}


export type Data = Record<string, any>

export const FormContext = React.createContext<FormProviderInterface>(null);

let addedFields: Array<Field> = [];
let allFields: Array<Field> = [];

const Form = (props: FastFormProps) => {
    const { container, debug, onSubmit, onChange, attributes, defaultValues, submitLabel } = props;
    const [data, setData] = React.useState<Data>({});
    const [errors, setErrors] = React.useState<Data>({});
    const [render, setRender] = React.useState(null);
    const elements = container.getFields();
    const handleChange = (name: string, value: any) => {
        let newData: Data = {};
        newData[name] = value;
        setData(prevData => ({ ...prevData, ...newData }));
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
        let newErrors: Data = {};
        newErrors[name] = errorMessage;
        setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));
    }

    const validateForm = () => {
        let valid = true;
        setErrors({});
        console.log(errors);
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


            // Check the custom field validator
            if (isValid(value)) {
                if (!field.validate(value)) {
                    setError(name, field.getError());
                    valid = false;
                }
            }

            // Remove ignored values
            if (field.isIgnored()) {
                submittedData = omit(submittedData, name);
            }

            submittedData = pickBy(submittedData, (value, key) => {
                return addedFields.find(field => field.getName() == key)
            });
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
                // Check if the field is able to be rendered.
                if (!element.isRendered()) {
                    return renderElements;
                }
                // Replace the dependencies if exist.
                let dependency = element.getDependency();
                if (dependency) {
                    if (isValid(data[dependency])) {
                        addedFields.push(element);
                        element = element.replaceDependencies(data[dependency]);
                    } else {
                        return renderElements;
                    }
                } else {
                    addedFields.push(element);
                }
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

    // Render the fields
    React.useEffect(() => {
        addedFields = [];

        setRender(recursiveRender(elements));

    }, [elements, errors, data]);

    // Set the default values for each field.
    React.useEffect(() => {
        let formDefaultValues = defaultValues;
        let fieldsDefaultValues = chain(allFields).keyBy(field => field.getName()).mapValues(field => field.getDefaultValue()).pickBy(value => isValid(value)).value();
        setData({ ...formDefaultValues, ...fieldsDefaultValues });
    }, [container]);

    const formProviderValues = {
        data: data,
        onChange: handleChange,
        allFields: allFields
    }

    if (debug) {
        console.log(data);
    }


    return (
        <form className="react-fast-forms" {...attributes}>
            <FormContext.Provider value={formProviderValues}>
                {render}
            </FormContext.Provider>
            <button value={submitLabel} onClick={handleSubmit}>{submitLabel}</button>
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
    defaultValues: {},
    submitLabel: "Submit"
}

Form.propTypes = {
    container: PropTypes.instanceOf(Container).isRequired
}

export default Form


