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

    componentDidMount() {
        if(window.localStorage.isLoggedIn && window.localStorage.user){
            this.props.history.push('/dashboard')
            window.location.reload()
        }
    }

    async onClickLogin(e) {
        let response = await axios.post('/login', this.state)
        alert(response.data.msg)
        if(!response.data.hasAcct){
            this.props.history.push('/register')
            window.location.reload()
        }else{
            if(response.data.pwd) {
                window.localStorage.isLoggedIn = true
                window.localStorage.user = response.data.user.student_id
                this.props.history.push('/dashboard')
                window.location.reload()
            }
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
                    <h3 style={{textAlign: 'center', color:"#5784BA"}}>Glad to see you again!</h3>
                    <CardBody>
                        <FormInput placeholder="Email" onChange={(e) => {this.setState({email: e.target.value})}}/>
                        <br/>
                        <FormInput placeholder="Password" type="password" onChange={(e) => {this.setState({password: e.target.value})}}/>
                        <br/>
                        <ButtonGroup horizontal>
                            <Button theme="light" onClick = {this.onClickLogin}>Login</Button>
                            {/* <Button theme="light" onClick = {this.onClickRegister}><a href="/register">Register &rarr;</a></Button> */}
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