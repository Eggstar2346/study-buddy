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

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_name: "",
            course_id: "",
            grade_weight: "",
            due_date: "",
            grade: "",
            task_type: "Select",
            completed: false,
            open: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.newTask = this.newTask.bind(this)
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
        console.log(this.state)
        let temp = this.state;
        temp.grade = parseFloat(temp.grade)
        temp.grade_weight = parseFloat(temp.grade_weight)
        let response = await axios.post('/tasks/addTask', temp)
        console.log(response.data)
    }

    render() {
        console.log("Hello ", this.state.task_type);
        return (
            <div>
                <InputGroup classname="get_task_name">
                    <FormInput name="task_name" placeholder="Task Name (eg. Assignment 1)" onChange={(event) => {this.setState({task_name: event.target.value})}}/>    
                </InputGroup>
                <InputGroup classname="get_course_id">
                    <FormInput name="course_id" placeholder="Course (eg. CALC100)" onChange={(event) => {this.setState({course_id: event.target.value})}}/>
                </InputGroup>
                <InputGroup classname="get_grade_weight">
                    <FormInput name="grade_weight" placeholder="Percentage of Grade (eg. 0.1)" onChange={(event) => {this.setState({grade_weight: event.target.value})}}/>
                </InputGroup>
                <InputGroup classname="get_due_date">
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Due date</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="due_date" type="date" onChange={(event) => {this.setState({due_date: event.target.value})}}/>
                </InputGroup>
                <InputGroup classname="get_grade">
                    <FormInput name="grade" placeholder="Grade received (eg. 70)" onChange={(event) => {this.setState({grade: event.target.value})}}/>
                </InputGroup>
                <InputGroup classname="get_task_type">
                    <FormInput name="task_type" placeholder="Type (Core/Elective)"/>
                    <Dropdown open={this.state.open} toggle={this.toggle}>
                        <DropdownToggle>Select</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem value="Core" onClick={(event) => (this.setState({task_type: event.target.value}))}>Core</DropdownItem>
                                <DropdownItem value="Elective" onClick={(event) => (this.setState({task_type: event.target.value}))}>Elective</DropdownItem>
                            </DropdownMenu>
                    </Dropdown>
                </InputGroup>
                    <FormCheckbox
                        toggle
                        checked={this.state.completed}
                        onChange={this.handleChange}>
                        Completed
                    </FormCheckbox>
                <br></br>

                <Button theme="success">I'm done!</Button>
            </div>
        );  
    }
}