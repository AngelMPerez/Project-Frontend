import React from "react";
import './App.css'
import Create from './components/Create'
import List from './components/List'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function redirect(){
  let to = ()=>{
    document.getElementById("List").click()
  }
  return to
}

export default function BasicExample() {
  return (
    <Router>
      <div style={{textAlign: "center"}}>
        <ul>
          <li>
            <Link style={{color:'#0C1B33'}} to="/">Create</Link>
          </li>
          <li>
            <Link style={{color:'#0C1B33'}} id="List" to="/List">List</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Create redirect={redirect()}/>
          </Route>
          <Route path="/List">
            <List />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}
