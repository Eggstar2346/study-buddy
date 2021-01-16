import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput
} from "shards-react";

export default class TaskTypeDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
  }

  toggle() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }

  render() {
    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Type</InputGroupText>
            </InputGroupAddon>
            <FormInput name="grade" placeholder="70"/>
            <Dropdown open={this.state.open} toggle={this.toggle}>
                <DropdownToggle>Select &#9660;</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Core</DropdownItem>
                    <DropdownItem>Elective</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </InputGroup>       
    );
  }
}