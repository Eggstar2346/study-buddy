import React from 'react';
import { Button, ButtonGroup } from "shards-react";

function TimerButtons(props){
    return(
        <div className="play-pause-stop">
            <ButtonGroup>
                <Button outline theme="dark">&#9724;</Button>
                <Button outline theme="dark">&#9654;</Button>
                <Button outline theme="dark">&#10074;&#10074;</Button>
            </ButtonGroup>
        </div>
    );
}

export default TimerButtons