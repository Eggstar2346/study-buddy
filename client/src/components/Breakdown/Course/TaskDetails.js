import React from 'react';
import {Col, FormInput, Row} from "shards-react";

export default function TaskDetails(props) {
    const task = props.task
    
    return (
        <li>
            <Row>
                <Col md={6}>
                    <p>{task.task_type} {task.task_name}, Due on {task.due_date}</p>
                </Col>
                <Col md={6}>
                    <FormInput id={task.task_id + " date"} type="date" value={task.due_date}/>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p>{task.completed ? 'completed' : 'incomplete'} with grade {task.grade ? task.grade : 'no grade'}, worth {task.grade_weight*100}% of total mark</p>
                </Col>
                <Col md={6}>
                    <FormInput id={task.task_id + " grade"} type="text" placeholder="grade" value={task.grade}/>
                    <input type="checkbox" id={task.task_id + " completed"} checked={task.completed}/> <label>Completed {task.task_type}</label>
                </Col>
            </Row>
        </li>
    )
}