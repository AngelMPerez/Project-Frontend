import React from "react";
import './App.css'
import Create from './Create'
import List from './List'
import read from './read'
// import {useHistory} from "react-router-dom";
// import Hook from './Hook'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// var arr=[]

// async function read(){
//   // axios.interceptors.request.use(config => {
//   //   // log a message before any HTTP request is sent
//   //   console.log('Request was sent');
//   //   return config;
//   // });
//   axios.get('https://my-first-proj.herokuapp.com/')
//   .then(function(response){
//     arr = response.data
//     console.log(response)
//   })
//   .catch(function(error){
//     console.log(error)
//   })
//   console.log('read in BasicExample')
// }

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

// You can think of these components as "pages"
// in your app.
