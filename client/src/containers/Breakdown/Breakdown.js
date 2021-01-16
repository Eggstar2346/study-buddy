import React, {useState} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Container, Row } from "shards-react";

import Course from './Course';

const Breakdown = props => {
    
    const [course1, setCourse1] = useState("Fucking 367");
    
    return (
        <Container>
            <Row>
                <Course name={course1}/>
                <Course name={course1}/>
            </Row>
        </Container>
    );
};

export default Breakdown;