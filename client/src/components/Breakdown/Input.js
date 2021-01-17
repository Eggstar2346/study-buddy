import React from 'react';
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput,
    Button
  } from "shards-react";

const Input = props => {
    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>{props.type}</InputGroupText>
            </InputGroupAddon>
            <FormInput type="text"placeholder="" value={props.value} onChange={props.update}/>
            <InputGroupAddon type="append">
                <Button theme="secondary" onClick={()=>console.log("clicked update")}>Update</Button>
            </InputGroupAddon>
        </InputGroup>
    )
};

export default Input;