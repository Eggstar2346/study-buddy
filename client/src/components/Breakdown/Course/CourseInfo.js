import React from 'react';

import Input from '../Input';

const CourseInfo = props => {
    return (
        <div className="CourseInfo">
            <p>Professor {props.profName}</p>
            <Input type="Professor" value={props.profName} update={(event) => props.updateProf(event.target.value)}/>
            <p>Email: {props.email}</p>
            <Input type="Prof Email" value={props.email} update={(event) => props.updateEmail(event.target.value)}/>
            {props.TA.map((el, i) => {
                return (
                    <div id={i}>
                        <p>TA: {el.name}</p>
                        {/* <Input type="TA" value={el.name} update={props.}/> */}
                        <p>Email: {el.email}</p>
                        {/* <Input type="TA Email" value={el.email} update={props.}/> */}
                    </div>
                )
            })}
        </div>
    );
};

export default CourseInfo;