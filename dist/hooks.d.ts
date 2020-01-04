/// <reference types="react" />
declare type Props = any;
declare type Render = React.ReactNode;
interface InputProps {
    name: string;
    value: any;
    required: boolean;
    onChange: (value: string) => void;
}
declare type ContainerHook = (defaultValues?: Props) => [Render, Props];
declare type FieldHook = (defaultValues?: Props) => [InputProps, Props];
/**
 *
 * @param defaultValues The default values
 *
 * @returns An array
 */
export declare const useContainer: ContainerHook;
/**
 *
 * @param defaultValues The default values
 *
 * @returns An array
 */
export declare const useField: FieldHook;
export {};
