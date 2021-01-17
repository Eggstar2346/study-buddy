import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Button, Col, FormInput, Modal, ModalBody, ModalHeader, Row} from "shards-react";
import Task from '../../Task';

import Input from '../Input';
import TaskDetails from './TaskDetails';
const TaskInfo = props => {
    let [displayTasks, setDisplayTasks] = useState([])
    let [open, setOpen] = useState(false)

    useEffect(() => {
        const importantTasks = (props.tasks.length > 0) ? props.tasks.map((task, i) => {
            return (
                <TaskDetails task={task}/>
            );
        }) : []
        setDisplayTasks(importantTasks)
    }, [props])
    
    return (
        <div>
            <Modal open={open} toggle={() => {setOpen(!open)}}>
                <ModalHeader>New Task</ModalHeader>
                <ModalBody> 
                    <Task setDisplay={setDisplayTasks} display={displayTasks} close={setOpen} id={props.course_id}/>
                </ModalBody>
            </Modal>
            <h3 style={{marginBottom: '50px'}}>Assignments & Assessments for the Course</h3>
            <ul style={{listStyleType: 'none'}}>
                {displayTasks}
                <Button onClick={() => {setOpen(!open)}}>Add New Task</Button>
            </ul>
        </div>
    );
};

export default TaskInfo;