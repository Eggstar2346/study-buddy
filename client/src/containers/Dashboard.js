import React from 'react';
import { Card, Col, Container, Row, CardBody, CardTitle, CardSubtitle, Badge, CardHeader } from "shards-react";
import WeeklyOverview from '../components/WeeklyOverview';

function Dashboard (props) {
    const daysOfWeek = ['mon','tues','wed','thurs','fri', 'weekend'] //placeholder
    const tags = ['ESC301', 'AER372', 'CSC384', 'ECE353', 'MIE438', 'ROB313'] //placeholder

    return(
        <Container>
            <br/><br/>
            <Row>
                <Col lg={9}>
                    <WeeklyOverview days={daysOfWeek} tags={tags}/>
                </Col>
                <Col lg={3}>

                </Col>
            </Row>
    
        </Container>
    )
}

export default Dashboard;
