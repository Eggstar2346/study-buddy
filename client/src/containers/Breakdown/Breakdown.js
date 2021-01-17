import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Container, Row } from "shards-react";

import Course from './Course';

const Breakdown = props => {
    
    const [course1, setCourse1] = useState("Fucking 367");
    
    useEffect(() => {
        if(!window.localStorage.isLoggedIn || !window.localStorage.user){
            props.history.push('/login')
            window.location.reload()
        }else{
            let res = axios.get(`/users/${window.localStorage.user.student_id}/current`)
            if(res.data.isNewUser) {
                
            } else {
                const tt = res.data.timetable
                console.log(tt)
            }
        }
    })

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