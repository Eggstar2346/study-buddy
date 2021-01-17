import React, {useEffect, useState} from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button,
    Col,
    Row,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormInput
  } from "shards-react";

import CourseInfo from '../../components/Breakdown/Course/CourseInfo';
import MarkBreakdown from '../../components/Breakdown/Course/MarkBreakdown';
import Dates from '../../components/Breakdown/Course/Dates';
import Input from '../../components/Breakdown/Input';
import TaskInfo from '../../components/Breakdown/Course/TaskInfo';
import axios from 'axios';

const Course = props => {
    const [profName, setProfName] = useState("");
    const [profEmail, setProfEmail] = useState("");
    const [TAs, setTas] = useState([{name: '', email: ''}]);
    const [tasks, setTasks] = useState([])
    const [openDD, setOpenDD] = useState(false)
    const [select, setSelect] = useState('Select Type of Course')

    useEffect(() => {
        async function getInfo() {
            let res = await axios.get(`/tasks/${props.courseInfo.course_id}/getAll`)
            setTasks(res.data)
        }
        if(props.courseInfo.tas){
            const emails = props.courseInfo.ta_emails.split(',')
            const tas = props.courseInfo.tas.split(',').map((t, i) => {
                return {
                    name: t, email: emails[i]
                }
            })
            setTas(tas)
        }
        getInfo()
    }, [props])

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
                            Course: {props.name}, Timetable: {props.tt}
                        </CardHeader>
                    </Col>                   
                </Row>
                <CardBody>
                    <CourseInfo 
                        profName={props.courseInfo.profs} 
                        updateProf={setProfName} 
                        email={props.courseInfo.profs_email} 
                        updateEmail={setProfEmail}
                        TA={TAs}
                        updateTa={updateTa}
                        />
                    <Dropdown open={openDD} toggle={() => {setOpenDD(!openDD)}}>
                        <DropdownToggle>{select}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem value="Core" onClick={() => {setSelect('Core')}}>Core</DropdownItem>
                                <DropdownItem value="Elective" onClick={() => {setSelect('Elective')}}>Elective</DropdownItem>
                            </DropdownMenu>
                    </Dropdown>
                    <TaskInfo tasks={tasks} course_id={props.courseInfo.course_id}/>
                    {/* <Button theme="light" onClick={}>Upload Course Info with a PDF scan</Button> */}
                </CardBody>
            </Card>
        </Col>
    );
};

export default Course;