import React from 'react';
import { Card, Col, Container, Row, CardBody, CardTitle, CardSubtitle, Badge, CardHeader } from "shards-react";
import WeeklyOverview from '../components/WeeklyOverview';
import TimerButtons from '../components/TimerButtons';
import Timetable from '../components/Timetable';
import RecommendedTasks from '../components/RecommendedTasks'

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
                    <RecommendedTasks/>
                    <div style={{display:'flex',alignItems:'center', justifyContent: 'center'}}>
                        <TimerButtons/>
                    </div>
                    <Timetable/>
                </Col>
            </Row>
    
        </Container>
    )
}

export default Dashboard;
