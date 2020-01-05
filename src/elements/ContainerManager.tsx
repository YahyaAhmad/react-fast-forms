import React from 'react'

export const ContainerContext = React.createContext(null);

interface ContainerManagerProps {
    children: React.ReactNode
    label: string
    render: React.ReactNode
    containerProps: object
}

const ContainerManager = ({ children, containerProps, render }: ContainerManagerProps) => {
    return (
        <ContainerContext.Provider value={{ render: render, containerProps: containerProps }}>
            {children}
        </ContainerContext.Provider>
        
    )
}

export default ContainerManager
