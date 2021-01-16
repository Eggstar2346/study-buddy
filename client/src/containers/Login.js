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

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);

        this.state = {
            login: true,
            register: false
        };

        this.loginfo = {
            name: "",
            email: "",
            password: "",
            confpwd: ""
        };
    }

    onClickLogin(e) {
        if (this.state.register) {
            this.setState({login: true, register: false});
        }
    }

    onClickRegister(e) {
        if (this.state.login) {
            this.setState({login: false, register: true});
        }
    }

    render () {
        return (
            <Container>
                <Row>
                <Col md={3}></Col>
                <Col md={6}>
                <Card style={{ maxWidth: "800px" }} id="logincard">
                    {this.state.login && <h6>Glad to see you again!</h6>}
                    {this.state.register && <h6>Welcome to Study Buddy!</h6>}
                    <CardBody>
                        {this.state.register && <FormInput placeholder="Name" update={(e) => (this.loginfo.name = e.target.value)}/>}
                        {this.state.register && <br/>}
                        <FormInput placeholder="Email" update={(e) => (this.loginfo.email = e.target.value)}/>
                        <br/>
                        <FormInput placeholder="Password" update={(e) => (this.loginfo.password = e.target.value)}/>
                        <br/>
                        {this.state.register && <FormInput placeholder="Confirm password" update={(e) => (this.loginfo.confpwd = e.target.value)}/>}
                        {this.state.register && <br/>}
                        <ButtonGroup horizontal>
                            <Button theme="light" onClick = {this.onClickLogin}>Login</Button>
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