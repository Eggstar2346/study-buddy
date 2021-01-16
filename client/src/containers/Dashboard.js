import React from 'react';
import { Card, Col, Container, Row, CardBody, CardTitle, CardSubtitle, Badge, CardHeader } from "shards-react";
import RecommendedTasks from "../components/RecommendedTasks";

function Dashboard (props) {
    const daysOfWeek = ['mon','tues','wed','thurs','fri', 'weekend'] //placeholder
    const tags = ['ESC301', 'AER372', 'CSC384', 'ECE353', 'MIE438', 'ROB313'] //placeholder

    return(
        <Container>
            <br/><br/>
            <Row>
                <RecommendedTasks/>
                <Col lg={9}>
                    <Container style={{overflow: 'auto'}}>
                        <Row style={{width: '180%'}}>
                            {
                                daysOfWeek.map((val,i) => {
                                    return <Col md={2}>
                                        <Card>
                                            <CardHeader style={{textAlign: 'center', textTransform: 'uppercase'}}>{val}</CardHeader>
                                            <CardBody>
                                                {
                                                    tags.map(val => {
                                                        return<Badge>{val}</Badge>
                                                    })
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                })
                            }
                        </Row>
                    </Container>
                </Col>
                <Col lg={3}>

                </Col>
            </Row>
        
        </Container>
    )
}

export default Dashboard;