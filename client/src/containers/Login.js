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
            email: "",
            password: ""
        };
    }

    onClickLogin(e) {
        if (this.state.register) {
        }
    }

    onClickRegister(e) {
        if (this.state.login) {
        }
    }

    render () {
        return (
            <Container>
                <Row>
                <Col md={3}></Col>
                <Col md={6}>
                <Card style={{ maxWidth: "800px" }} id="logincard">
                    <h6>Glad to see you again!</h6>
                    <CardBody>
                        <FormInput placeholder="Email" onChange={(e) => {this.setState({email: e.target.value})}}/>
                        <br/>
                        <FormInput placeholder="Password" onChange={(e) => {this.setState({password: e.target.value})}}/>
                        <br/>
                        <ButtonGroup horizontal>
                            <Button theme="light" onClick = {this.onClickLogin}>Login</Button>
                            <Button theme="light" onClick = {this.onClickRegister}><a href="/register">Register &rarr;</a></Button>
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