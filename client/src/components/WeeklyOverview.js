import React from 'react';
import { Card, Col, Container, Row, CardBody, Badge, CardHeader } from "shards-react";

import styles from './WeeklyOverview.module.css';

export default function WeeklyOverview (props) {
    return(
        <Container style={{overflow: 'visible'}}>
            <Row className={styles.Row}>
                {
                    props.days.map((val,i) => {
                        return <Col md={2} className={styles.Col} >
                            <Card style={{ maxWidth: "300px", }} /*className={styles.Card}*/>
                                <CardHeader style={{textAlign: 'center', textTransform: 'uppercase'}} className={styles.CardHeader}>{val}</CardHeader>
                                <CardBody className={styles.CardBody}>
                                    {
                                        props.tags.map(val => {
                                            return<Badge style={{color: '#808080'}} className={styles[val]}>{val}</Badge>
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

