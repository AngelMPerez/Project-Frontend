import React from "react";
import axios from 'axios'
import './App.css'
import Create from './components/Create'
import List from './components/List'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

var arr=[]

function read(){
  // axios.interceptors.request.use(config => {
  //   // log a message before any HTTP request is sent
  //   console.log('Request was sent');
  //   return config;
  // });
  axios.get('https://my-first-proj.herokuapp.com/')
  .then((response)=>{
    arr=response.data
  })
  .catch(function(error){
    console.log(error)
  })
  return arr
}

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
            <List read={read()} />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}
