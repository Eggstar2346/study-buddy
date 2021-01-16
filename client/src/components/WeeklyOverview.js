import React from 'react';
import { Card, Col, Container, Row, CardBody, Badge, CardHeader } from "shards-react";

export default function WeeklyOverview (props) {
    return(
        <Container style={{overflow: 'auto'}}>
            <Row style={{width: '180%'}}>
                {
                    props.days.map((val,i) => {
                        return <Col md={2}>
                            <Card>
                                <CardHeader style={{textAlign: 'center', textTransform: 'uppercase'}}>{val}</CardHeader>
                                <CardBody>
                                    {
                                        props.tags.map(val => {
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
    )
}

