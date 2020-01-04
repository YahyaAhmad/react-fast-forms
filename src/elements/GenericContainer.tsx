import React from 'react'
import { useContainer } from '../hooks';
const GenericContainer = () => {
    const [render, { tag }] = useContainer({ tag: "div" });
    const Tag = tag;
    return (
        <Tag data-type="container">
            {render}
        </Tag>
    )
}

export default GenericContainer
