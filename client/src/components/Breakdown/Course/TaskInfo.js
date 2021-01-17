import React from 'react';
import {Col, Row} from "shards-react";

import Input from '../Input';
const TaskInfo = props => {
    const importantTasks = props.tasks.map((task, i) => {
        return (
            <li>
                <Row>
                    <Col md={4}>
                        <p>{task.name}: {task.date}, {task.mark}</p>
                    </Col>
                    <Col md={8}>
                    <Input type="" value={task.date} update={event => {
                            let newDates = [...props.dates];
                            newDates[i] = {name: task.name, date: event.target.value};
                            props.update(newDates)}}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}/>
                    <Col md={8}>
                        <Input type="" value={props.breakdown[mark]} update={event => {
                            let newBreakdown = {...props.breakdown};
                            newBreakdown[mark] = event.target.value;
                            props.update(newBreakdown)}}/>
                    </Col>
                </Row>
            </li>
        );
    })
    return (
        <div>
            <h3 style={{marginBottom: '50px'}}>Assignments & Assessments for the Course</h3>
            <ul>
                {importantTasks}
            </ul>
        </div>
    );
};

export default TaskInfo;