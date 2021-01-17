import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Container, Row, Button, Modal, ModalHeader, ModalBody, FormInput, Col } from "shards-react";

import Course from './Course';

const Breakdown = props => {
    
    const [course1, setCourse1] = useState("Fucking 367");
    let [courseView, setCourseView] = useState([])
    let [open, setOpen] = useState(false)

    useEffect(() => {
        async function authUser() {
            if(!window.localStorage.isLoggedIn || !window.localStorage.user){
                props.history.push('/login')
                window.location.reload()
            } else {
                console.log(window.localStorage)
                let res = await axios.get(`/users/${window.localStorage.user}/current`)
                if(res.data.courses.length > 0) {
                    const courses = res.data.courses.map(c => {
                        return <Col md={6}><br/><br/><Course name={c.course_name} courseInfo={c} tt={c.timetable}/></Col>
                    })
                    setCourseView(courses)
                }
            }
        }
        authUser()
    },[props]) 


    async function initCourse(e) {
        setOpen(false)
        const cName = document.getElementById('courseName').value
        const tt = document.getElementById('timetable').value

        let res = await axios.post('/courses/addCourse', {
            timetable: tt,
            student_id: window.localStorage.user,
            course_name: cName
        })

        alert(res.data.msg)

        setCourseView([...courseView,  <Col md={6}><br/><br/><Course name={cName} courseInfo={res.data.info} tt={res.data.info.timetable}/></Col>])
    }

    return (
        <Container>
            <Button theme="dark" onClick={() => {setOpen(true)}}>Add Course</Button>
            <Row>
                {
                    (courseView.length <= 0) ? <span/> : courseView
                }
                
            </Row>
            <Modal open={open} toggle={() => {setOpen(!open)}}>
                <ModalHeader>New Course</ModalHeader>
                <ModalBody> 
                    <FormInput placeholder="Course Name" id="courseName"/>
                    <FormInput placeholder="Course TimeTable" id="timetable"/>
                    <Button theme="light" onClick={initCourse}>Add</Button>
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default Breakdown;