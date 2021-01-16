import React, {useState} from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import './App.module.css';
import Dashboard from './containers/Dashboard';
import Navbar from "./components/Navbar";
import Breakdown from "./containers/Breakdown";
import Timetable from "./containers/Timetable"

function App() {
  let [navClass, setNavClass] = useState("")

  return (
    <div class="body-container">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/courses" component={Breakdown}/>
          {/*<Route exact path="/analytics" component={}/>
          <Route exact path="/settings" component={}/> */}
        </Switch>
        {/* Footer */}
      </BrowserRouter>
    </div>
  );
}

export default App;

