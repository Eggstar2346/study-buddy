import React from 'react';
import { Container } from 'shards-react';
import Task from "../components/Task"

function Test (props) {
    return (
        <Container>
            <h2>Enter your tasks for ESC301</h2>
            <Task/>
        </Container>
    )
}

export default Test;