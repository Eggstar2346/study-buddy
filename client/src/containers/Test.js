import React from 'react';
import { Container, 
        Row,
        Col,
        Card } from 'shards-react';
import Task from "../components/Task"

function Test (props) {
    return (
        <Container>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <Card style={{ maxWidth: "800px" }} id="taskcard">
                        <h4 style={{textAlign: 'center'}}>Enter your tasks for ESC301</h4>
                        <Task/>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Test;