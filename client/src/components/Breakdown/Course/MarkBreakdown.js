import React from 'react';
import {Col, Row} from "shards-react";

import Input from '../Input';

const MarkBreakdown = props => {
    return (
        <div MarkBreakdown="MarkBreakdown">
            <h3 style={{marginBottom: '50px'}}>Mark Breakdown</h3>
            {Object.keys(props.breakdown).map(mark => {
                return (
                <Row>
                    <Col>
                        <p>{mark}: {props.breakdown[mark]}</p>
                    </Col>
                    <Col>
                        <Input type="" value={props.breakdown[mark]} update={event => {
                            let newBreakdown = {...props.breakdown};
                            newBreakdown[mark] = event.target.value;
                            props.update(newBreakdown)}}/>
                    </Col>
                </Row>
            );})}
        </div>
    );
};

export default MarkBreakdown;