import React from 'react';
import {Col, Row} from "shards-react";

import Input from '../Input';
const Dates = props => {
    const importantDates = props.dates.map((date, i) => {
        return (
            <li>
                <Row>
                    <Col>
                        <p>{date.name}: {date.date}</p>
                    </Col>
                    <Col>
                    <Input type="" value={date.date} update={event => {
                            let newDates = [...props.dates];
                            newDates[i] = {name: date.name, date: event.target.value};
                            props.update(newDates)}}/>
                    </Col>
                </Row>
                
            </li>
        );
    })
    return (
        <div className="Dates">
            <h3 style={{marginBottom: '50px'}}>Important Dates</h3>
            <ul>
                {importantDates}
            </ul>
        </div>
    );
};

export default Dates;