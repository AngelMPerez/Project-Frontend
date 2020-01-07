import React from "react";
import './App.css'
import Create from './components/Create'
import List from './components/List'
import read from './components/read'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function BasicExample() {

  read()
  return (
    <Router>
      <div style={{textAlign: "center"}}>
        <ul>
          
          <li>
            <Link style={{color:'#0C1B33'}} to="/">Create</Link>
          </li>
          <li>
            <Link style={{color:'#0C1B33'}} to="/List">List</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Create />
          </Route>
          <Route path="/List">
            <List />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}
