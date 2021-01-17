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
import axios from 'axios'

export default class RecommendedTasks extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      orange: false,
      lemon: false,
      kiwi: false,
      tasks: [],
      checked: []
    };
  }

  handleChange(e, fruit) {
    const newState = this.state.checked;
    newState[fruit] = !this.state.checked[fruit];
    this.setState({checked : newState});
  }

  async componentDidMount() {
    let res = await axios.get(`/student/${window.localStorage.user}/getRecommendedTasks`)
    console.log(res.data)
    this.setState({tasks: res.data, checked: res.data.map(d => {return false})})
  }
  render() {
    return (
      <Card style={{ maxWidth: "340px" }} className={styles.ToDo}>
      {/* <CardHeader style={{textAlign: 'center', color: '#0f7e9b', width: "16", height: "16"}}>Recommended Tasks</CardHeader> */}
      <CardBody>
      <div id="rec-tasks">
      <h4 style={{textAlign: 'center', color: '#5e6668'}}>To-do Tasks</h4>

        {
          this.state.tasks.map((t, i) => {
            return <FormCheckbox className={styles.Form}
            checked={this.state.checked[i]}
            onChange={e => {this.handleChange(e, i)}}>
              {t.task_name} - {t.course_name}
            </FormCheckbox>
          })
        }
        
        {/* <FormCheckbox className={styles.Form}
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
        </FormCheckbox> */}
      </div>
      </CardBody>
    </Card>
    );
  }
}