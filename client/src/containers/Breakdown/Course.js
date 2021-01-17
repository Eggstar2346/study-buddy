import React, {useState} from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button,
    Col,
    Row
  } from "shards-react";

import CourseInfo from '../../components/Breakdown/Course/CourseInfo';
import MarkBreakdown from '../../components/Breakdown/Course/MarkBreakdown';
import Dates from '../../components/Breakdown/Course/Dates';
import Input from '../../components/Breakdown/Input';

const Course = props => {
    const [profName, setProfName] = useState("Stark Draper");
    const [profEmail, setProfEmail] = useState("stark.draper@utoronto.ca");
    const [TAs, setTas] = useState([{name: 'Mark', email: 'mark@utoronto.ca'}]);

    const createNewTa = (fullName, email) => {
        const newTa = {fullName: fullName, email: email};
        setTas([...TAs, newTa]);
    }

    const marks = {
        midterm: '30%',
        assignments: '30%',
        final: '40%'
    }

    const dates = [
        {name: 'assign1', date: "Feb 02"},
        {name: 'assign2', date: "Feb 02"},
        {name: 'assign3', date: "Feb 02"}
    ]
    return (
        <Col>
            <Card>
                <Row>
                    <Col>
                        <CardHeader>
                            Course: {props.name}
                        </CardHeader>
                    </Col>                   
                </Row>
                <CardBody>
                    <CourseInfo 
                        profName={profName} 
                        updateProf={setProfName} 
                        email={profEmail} 
                        updateEmail={setProfEmail}
                        TA={TAs}
                        />
                    <MarkBreakdown breakdown={marks}/>
                    <Dates dates={dates}/>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Course;