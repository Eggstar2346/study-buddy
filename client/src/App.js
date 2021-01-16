import React, {useState} from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import './App.module.css';
import Dashboard from './containers/Dashboard';
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import Breakdown from './containers/Breakdown/Breakdown';
=======
import Breakdown from "./containers/Breakdown";
import Timetable from "./containers/Timetable"
>>>>>>> acd1ee974e31979e5ec783d3aa93f80f5e191f93

function App() {
  let [navClass, setNavClass] = useState("")

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        {/* <Route exact path="/courses" component={}/>
        <Route exact path="/analytics" component={}/>
        <Route exact path="/settings" component={}/> */}
        <Route exact path="/Breakdown" component={Breakdown}/>
      </Switch>
      {/* Footer */}
    </BrowserRouter>
=======
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
>>>>>>> acd1ee974e31979e5ec783d3aa93f80f5e191f93
  );
}

export default App;

