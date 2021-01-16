import React from 'react';
import { Col, Container, Nav, NavItem, NavLink, Row } from "shards-react";

function Dashboard (props) {
    const daysOfWeek = ['mon','tues','wed','thurs','fri'] //placeholder

    return(
        <Container>
            <Row>
                {
                    daysOfWeek.map((val,i) => {
                        return <Col>
                            <h4>{val}</h4>
                        </Col>
                    })
                }
            </Row>
        </Container>
    )
}

export default Dashboard;