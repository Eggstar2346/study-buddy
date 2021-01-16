import React from 'react';

const CourseInfo = props => {
    return (
        <div className="CourseInfo">
            <p>Professor {props.profName}</p>
            <p>Email: {props.email}</p>
            {props.TA.map((el, i) => {
                return (
                    <div id={i}>
                        <p>TA: {el.name}</p>
                        <p>Email: {el.email}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default CourseInfo;