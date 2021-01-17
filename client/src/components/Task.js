import React from 'react';
import axios from 'axios';

import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput,
    FormCheckbox,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'shards-react';
import TaskDetails from './Breakdown/Course/TaskDetails';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_name: "",
            // course_name: "",
            grade_weight: "",
            due_date: "",
            // grade: "",
            task_type: "Select Task Type",
            completed: false,
            open: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.newTask = this.newTask.bind(this)
        this.setTaskType = this.setTaskType.bind(this)
    }

    toggle() {
        this.setState(prevState => {
          return { 
            open: !prevState.open
        };
        });
    }

    handleChange() {
        this.setState({
          completed: !this.state.completed
        });
    }

    async newTask(){
        this.props.close(false)
        let temp = {
            grade_weight: parseFloat(this.state.grade_weight),
            course_id: parseInt(this.props.id),
            task_name: this.state.task_name,
            task_type: this.state.task_type,
            due_date: this.state.due_date
        };
        console.log(temp)
        let response = await axios.post('/tasks/addTask', temp)
        alert(response.data.msg)
        this.props.setDisplay([...this.props.display, 
            <TaskDetails task={response.data.info}/>
        ])
    }

    setTaskType(event) {
        this.setState({task_type: event.target.value})
    }

    render() {
        console.log("Hello ", this.state.task_type);
        return (
            <div>
                <InputGroup classname="get_task_name">
                    <FormInput name="task_name" placeholder="Task Name (eg. Assignment 1)" onChange={(event) => {this.setState({task_name: event.target.value})}}/>    
                </InputGroup>
                {/* <InputGroup classname="get_course_id">
                    <FormInput name="course_name" placeholder="Course (eg. CALC100)" onChange={(event) => {this.setState({course_name: event.target.value})}}/>
                </InputGroup> */}
                <InputGroup classname="get_grade_weight">
                    <FormInput name="grade_weight" placeholder="Percentage of Grade (eg. 0.1)" onChange={(event) => {this.setState({grade_weight: event.target.value})}}/>
                </InputGroup>
                <InputGroup classname="get_due_date">
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Due date</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="due_date" type="date" onChange={(event) => {this.setState({due_date: event.target.value})}}/>
                </InputGroup>
                {/* <InputGroup classname="get_grade">
                    <FormInput name="grade" placeholder="Grade received (eg. 70)" onChange={(event) => {this.setState({grade: event.target.value})}}/>
                </InputGroup> */}
                <InputGroup classname="get_task_type">
                    {/* <FormInput name="task_type" placeholder="Type (Core/Elective)"/> */}
                    <Dropdown open={this.state.open} toggle={this.toggle}>
                        <DropdownToggle>{this.state.task_type}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem value="Lab" onClick={this.setTaskType}>Lab</DropdownItem>
                                <DropdownItem value="Assignment" onClick={this.setTaskType}>Assignment</DropdownItem>
                                <DropdownItem value="Exam" onClick={this.setTaskType}>Exam</DropdownItem>
                                <DropdownItem value="Midterm" onClick={this.setTaskType}>Midterm</DropdownItem>
                                <DropdownItem value="Quiz" onClick={this.setTaskType}>Quiz</DropdownItem>
                            </DropdownMenu>
                    </Dropdown>
                </InputGroup>
                    {/* <FormCheckbox
                        toggle
                        checked={this.state.completed}
                        onChange={this.handleChange}>
                        Completed
                    </FormCheckbox> */}
                <br></br>

                <Button theme="success" onClick={this.newTask}>I'm done!</Button>
            </div>
        );  
    }
}