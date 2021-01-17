import React from 'react';
import { Button, ButtonGroup, Nav, NavItem, NavLink } from "shards-react";

export default function Navbar (props) {
    return(
        <div id="sidebar" className={props.toggle}>
            <div id="toggleBtn">
                <Button theme="light" onClick={props.openNav}> 💜 </Button>
            </div>
            <h6>Actions:</h6>
            <ButtonGroup vertical>
                <Button theme="light"> <a href="/courses"> View Course Breakdown </a> </Button>
                {/* <Button theme="light"> <a href="/"> Scan Syllabus/Course Outline </a> </Button> */}
                {/* <Button theme="light"> <a href="/settings">Settings </a> </Button> */}
                <Button theme="light" onClick={() => {window.localStorage.isLoggedIn = false}}> Logout </Button>
            </ButtonGroup>
            <br/><br/><br/>
            <h6>Sync to:</h6>
            <ButtonGroup vertical>
                <Button theme="light"> Google Calendar </Button>
                <Button theme="light"> Outlook </Button>
                <Button theme="light"> Google Drive </Button>
            </ButtonGroup>
      </div>
    )
}