import axios from 'axios';
import React, { useState } from 'react';
import { Button, ButtonGroup, FormInput, Modal, ModalBody, ModalHeader,  } from "shards-react";

export default function Navbar (props) {
    const [open, setOpen] = useState(false)

    async function scanPDF(){
        console.log('enter')
        let res = await axios.post('/scanPDF', {url: document.getElementById('url').value, student_id: window.localStorage.user})         
    }

    return(
        <>
        <Modal open={open} toggle={() => {setOpen(!open)}}>
            <ModalHeader>New Task</ModalHeader>
            <ModalBody> 
                <FormInput id="url" placeholder="url to pdf"/>
                <Button onClick={() => {scanPDF();setOpen(false)}}>Convert!</Button>
            </ModalBody>
        </Modal>
        <div id="sidebar" className={props.toggle}>
            <div id="toggleBtn">
                <Button theme="light" onClick={props.openNav}> 💜 </Button>
            </div>
            <h6>Actions:</h6>
            <ButtonGroup vertical>
                <Button theme="light"> <a href="/courses"> View Course Breakdown </a> </Button>
                <Button theme="light"> <a href="/dashboard"> View Dashboard </a> </Button>
                <Button theme="light" onClick={() => {setOpen(true)}}> PDF Analyzer </Button>
                <Button theme="light" onClick={() => {window.localStorage = {}}}> Logout </Button>
            </ButtonGroup>
            <br/><br/><br/>
            <h6>Sync to:</h6>
            <ButtonGroup vertical>
                <Button theme="light"> Google Calendar </Button>
                <Button theme="light"> Outlook </Button>
                <Button theme="light"> Google Drive </Button>
            </ButtonGroup>
      </div>
      </>
    )
}