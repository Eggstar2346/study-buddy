import React, {useState} from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import './App.css';
import Dashboard from './containers/Dashboard';
import Navbar from "./components/Navbar";
import Breakdown from './containers/Breakdown/Breakdown';
import Timetable from "./containers/Timetable";
import Login from './containers/Login';

function App() {
  let [navClass, setNavClass] = useState("")

  function toggleNav() {
    if(navClass === '') setNavClass('active')
    else setNavClass('')
  }

  return (
    <div class="body-container">
      <Navbar toggle={navClass} openNav={toggleNav}/>
      <div class="content-container" style={{paddingLeft: navClass ? '250px' : ''}}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/courses" component={Breakdown}/>
            <Route exact path="/login" component={Login}/>
            {/*<Route exact path="/analytics" component={}/>
            <Route exact path="/settings" component={}/> */}
          </Switch>
          {/* Footer */}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

