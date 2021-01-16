import React from 'react';
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput,
    Button,
} from 'shards-react';
import TaskCompleteToggle from './TaskCompleteToggle'
import TaskTypeDropdown from './TaskTypeDropdown';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_name: "",
            course_id: "",
            grade_weight: "",
            due_date: "",
            grade: "",
            task_type: "",
            completed: ""
        };
    }
    
    render() {
        console.log("Hello ", this.state.task_name);
        return (
            <div>
                <InputGroup classname="get_task_name">
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Task Name</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="task_name" placeholder="Problem set 1" onChange={(event) => {this.setState({task_name: event.target.value})}}/>    
                </InputGroup>
                <InputGroup classname="get_course_id">
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Course</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="course_id" placeholder="CALC100" />
                </InputGroup>
                <InputGroup classname="get_grade_weight">
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Percentage of Grade</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="grade_weight" placeholder="0.1" />
                </InputGroup>
                <InputGroup classname="get_due_date">
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Due date</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="due_date" type="date"/>
                </InputGroup>
                <InputGroup classname="get_grade">
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Grade received</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="grade" placeholder="70"/>
                </InputGroup>
                <InputGroup classname="get_task_type">
                    <TaskTypeDropdown/>
                </InputGroup>
                <TaskCompleteToggle/>
                <br></br>

                <Button theme="success">I'm done!</Button>
            </div>
        );
    }
}