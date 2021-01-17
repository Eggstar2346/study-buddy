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
    const [TAs, setTas] = useState([{id: 1, name: 'Mark', email: 'mark@utoronto.ca'}]);

    const createNewTa = (id, fullName, email) => {
        const newTa = {id: id, name: fullName, email: email};
        setTas([...TAs, newTa]);
    }

    const [marks, setMarks] = useState({
        midterm: '30%',
        assignments: '30%',
        final: '40%'
    });

    const [dates, setDates] = useState([
        {name: 'assign1', date: "Feb 02"},
        {name: 'assign2', date: "Feb 02"},
        {name: 'assign3', date: "Feb 02"}
    ]);

    const updateTa = (id, newName, newEmail) => {
        let newTAs = [...TAs];
        newTAs = newTAs.map(el => {
            if (el.id === id) {
                el.name = newName;
                el.email = newEmail;
                return el;
            }
            return el;
        });
        setTas(newTAs);
    };
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
                        updateTa={updateTa}
                        />
                    <MarkBreakdown breakdown={marks} update={setMarks}/>
                    <Dates dates={dates} update={setDates}/>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Course;