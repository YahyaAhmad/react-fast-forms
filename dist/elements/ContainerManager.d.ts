import React from 'react';
export declare const ContainerContext: React.Context<any>;
interface ContainerManagerProps {
    children: React.ReactNode;
    label: string;
    render: React.ReactNode;
    containerProps: object;
}
declare const ContainerManager: ({ children, containerProps, render }: ContainerManagerProps) => JSX.Element;
export default ContainerManager;
