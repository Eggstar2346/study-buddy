import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, CardBody, CardTitle, CardSubtitle, Badge, CardHeader, Button } from "shards-react";
import WeeklyOverview from '../components/WeeklyOverview';
import TimerButtons from '../components/TimerButtons';
import Timetable from '../components/Timetable';
import RecommendedTasks from '../components/RecommendedTasks'
import axios from 'axios';

function Dashboard (props) {
    const daysOfWeek = ['mon','tues','wed','thurs','fri', 'weekend'] //placeholder
    const tags = ['ESC301', 'AER372', 'CSC384', 'ECE353', 'MIE438', 'ROB313'] //placeholder
    let [isNew, setIsNew] = useState(false)

    useEffect(() => {
        if(!window.localStorage.isLoggedIn || !window.localStorage.user){
            props.history.push('/login')
            window.location.reload()
        } else {
            let res = axios.get(`/users/${window.localStorage.user.student_id}/current`)
            if(res.data.isNewUser) {
                setIsNew(true)
            } else {
                const tt = res.data.timetable
                console.log(tt)
            }
        }
    }, [props.history])
    
    return(
        <Container>
            <br/><br/>

            { isNew &&
            <>
                <Row>
                    <WeeklyOverview days={daysOfWeek} tags={tags}/>
                </Row>
                <Row>
                    <Col lg={4}>
                        <RecommendedTasks/>
                    </Col>
                    <Col lg={4}>
                        <div style={{display:'flex',alignItems:'center', justifyContent: 'center'}}>
                            <TimerButtons/>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Timetable/>
                    </Col>
                </Row>
            </>}
            {!isNew && 
                <Row>
                    <h5>You don't have any data uploaded yet</h5>
                    <Button><a href="/courses">Upload Courses</a></Button>
                </Row>
            }
        </Container>
    )
}

export default Dashboard;
