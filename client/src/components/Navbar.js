import React from 'react';
import { Button, ButtonGroup, Nav, NavItem, NavLink } from "shards-react";

export default function Navbar (props) {
    return(
        <Nav id="sidebar" className={props.state}>
            <NavItem id="toggle-btn">
                <Button onClick={props.openNav}> </Button>
            </NavItem>
            <ButtonGroup vertical>
                <Button> View Full Timetable </Button>
                <Button> View Course Breakdown </Button>
                <Button> Scan Syllabus/Course Outline </Button>
                <Button> Settings </Button>
            </ButtonGroup>

            <h4>Sync to:</h4>
            <ButtonGroup vertical>
                <Button> Google Calendar </Button>
                <Button> Outlook </Button>
                <Button> Google Drive </Button>
            </ButtonGroup>
      </Nav>
    )
}