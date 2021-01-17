import React from 'react';
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput,
    Button
  } from "shards-react";

import styles from './Input.module.css';

const Input = props => {
    return (
        <InputGroup className={styles.Input}>
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