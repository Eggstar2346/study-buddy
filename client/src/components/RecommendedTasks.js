import React from "react";
import { 
  FormCheckbox,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

import styles from "./RecommendedTasks.module.css";

export default class RecommendedTasks extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      orange: false,
      lemon: false,
      kiwi: false
    };
  }

  handleChange(e, fruit) {
    const newState = {};
    newState[fruit] = !this.state[fruit];
    this.setState({ ...this.state, ...newState });
  }

  render() {
    return (
      <Card style={{ maxWidth: "340px" }} className={styles.ToDo}>
      {/* <CardHeader style={{textAlign: 'center', color: '#0f7e9b', width: "16", height: "16"}}>Recommended Tasks</CardHeader> */}
      <CardBody>
      <div id="rec-tasks">
      <h4 style={{textAlign: 'center', color: '#5e6668'}}>To-do Tasks</h4>
        <FormCheckbox className={styles.Form}
          checked={this.state.orange}
          onChange={e => this.handleChange(e, "orange")}
        >
          CSC384 Assignment
        </FormCheckbox>
        <FormCheckbox className={styles.Form}
          checked={this.state.lemon}
          onChange={e => this.handleChange(e, "lemon")}
        >
          ECE353 Lab
        </FormCheckbox>
        <FormCheckbox className={styles.Form}
          checked={this.state.kiwi}
          onChange={e => this.handleChange(e, "kiwi")}
        >
          ROB313 Quiz
        </FormCheckbox>
      </div>
      </CardBody>
    </Card>
    );
  }
}