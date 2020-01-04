import * as React from 'react';
import { Field } from '../builder';
export declare const FieldContext: React.Context<any>;
interface FieldManagerProps {
    field: Field;
    error: string;
}
declare const FieldManager: ({ field, error }: FieldManagerProps) => JSX.Element;
export default FieldManager;
