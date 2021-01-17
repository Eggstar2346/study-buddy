import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  FormInput,
  Container,
  Col,
  Row,
  ButtonGroup
} from "shards-react";
import axios from 'axios'
export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            confpwd: ""
        };
    }

    onClickLogin(e) {
        if (this.state.register) {
        }
    }

    async onClickRegister(e) {
        let response = await axios.post('/users/register', this.state)
        if(response.data.success){
            alert(response.data.msg)
            this.props.history.push('/login')
            window.location.reload()
        } else {
            alert('An error has occurred: ' + response.data.msg)
        }
    }

    render () {
        return (
            <Container>
                <Row>
                <Col md={3}></Col>
                <Col md={6}>
                <Card style={{ maxWidth: "800px" }} id="logincard">
                    <h6>Welcome to Study Buddy!</h6>
                    <CardBody>
                        <FormInput placeholder="Name" onChange={(e) => {this.setState({name: e.target.value})}}/>
                        <br/>
                        <FormInput placeholder="Email" onChange={(e) => {this.setState({email: e.target.value})}}/>
                        <br/>
                        <FormInput placeholder="Password" onChange={(e) => {this.setState({password: e.target.value})}}/>
                        <br/>
                        <FormInput placeholder="Confirm password" onChange={(e) => {this.setState({confpwd: e.target.value})}}/>
                        <br/>
                        <ButtonGroup horizontal>
                            <Button theme="light" onClick = {this.onClickLogin}><a href="/login">&larr; Login</a></Button>
                            <Button theme="light" onClick = {this.onClickRegister}>Register</Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
                </Col>
                <Col md={3}></Col>
                </Row>
            </Container>
        )
    }
}