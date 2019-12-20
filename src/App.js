import React from "react";
import axios from 'axios';
import './App.css'
// import {useHistory} from "react-router-dom";
// import Hook from './Hook'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var arr=[]
// var item

export default function BasicExample() {
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

class Create extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Type: 'Empty',
      Name:'Empty',
      Input: 'Empty',
      Output: 'Empty',
      Description: 'Empty'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.read=this.read.bind(this);
  }
  
  read(){
    axios.interceptors.request.use(config => {
      // log a message before any HTTP request is sent
      console.log('Request was sent');
      return config;
    });

    axios.get('https://my-first-proj.herokuapp.com/')
    .then(function(response){
      arr = response.data
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })

  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event){
    event.preventDefault();
    console.log(arr)
    await axios.post('https://my-first-proj.herokuapp.com/',this.state)
    .then(function (response) {
    //  arr=response.config.data
    console.log(response.config.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    this.read()
  }

forms(){
  return(
    <form >
      <b>Type: </b><input type='text' value={this.state.value} name='Type' placeholder='Type' onChange={this.handleChange}></input><br/>
      <b>Name: </b><input type='text' value={this.state.value} name='Name' placeholder='Name' onChange={this.handleChange}></input><br/>
      <b>Input: </b><input type="text" value={this.state.value} name="Input" placeholder="Input"  onChange={this.handleChange}></input><br/>
      <b>Output: </b><input type="text" value={this.state.value} name="Output" placeholder="Output"  onChange={this.handleChange}></input><br/>
      <textarea rows="4" cols="50" value={this.state.value} name="Description" placeholder='Description' onChange={this.handleChange}/>
    </form>
  )
}

componentDidMount(){
  // this.forceUpdate()
  // this.read()
}

 render(){
  this.read()
  
  return (
      <div style={{textAlign:'center'}}>
        {/* <h2>Create</h2> */}
        {this.forms()}
        <button class="alert alert-success" role="alert" onClick={this.handleSubmit}>Create</button>
        {/* <button onClick={this.handleUpdate}>Update</button> */}
        {/* <button onClick={this.handleDelete}>Delete</button> */}
      </div>
    );
  }  
}

class List extends React.Component{
 
  read(){
    axios.interceptors.request.use(config => {
      // log a message before any HTTP request is sent
      // console.log('Request was sent');
      return config;
    });

    axios.get('https://my-first-proj.herokuapp.com/')
    .then(function(response){
      arr = response.data
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })
  }


  async handleDelete(item){
    // event.preventDefault();
    await axios.delete(`https://my-first-proj.herokuapp.com/${item._id}`)
    .then(function(response){
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error)
    })
    this.read()
    // this.render()
  }
// componentDidMount(){
//   this.forceUpdate()
//   this.read()
// }
  render(){
    // this.read()
    // this.forceUpdate()
    let x = arr.map((item, index)=>
      <div class='center' key={index}>
      <h3>--------------------------</h3>
      {/* <h3>ID: {item._id}</h3> */}
      <h3>Type: {item.Type}</h3>
      <h3>Name: {item.Name}</h3>
      <h3>Input: {item.Input}</h3>
      <h3>Output: {item.Output}</h3>
      <h3>Description: {item.Description}</h3>
      {/* <button onClick={this.handleUpdate}> Update</button> */}
      
      <input class="alert alert-danger" type="submit" value="delete" onClick={()=>this.handleDelete(item)}/>
      <Router>
        <Link  to="/Update"><button class="alert alert-primary">Update</button></Link>
        <Route exact path="/Update">
            <Update prop={item}/>
            
        </Route>
      </Router>
      <h3>--------------------------</h3>
      </div>

    )
    return(
    <div>
      <h2>List</h2>
      {x}
      {/* <button onClick={}> Update</button> */}
      
    </div>
    );
  }
}

class Update extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Type:props.prop.Type,
      Name: props.prop.Name,
      Input: props.prop.Input,
      Output: props.prop.Output,
      Description: props.prop.Description
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.read=this.read.bind(this);
  }
  
  read(){
    axios.interceptors.request.use(config => {
      // log a message before any HTTP request is sent
      console.log('Request was sent');
      return config;
    });

    axios.get('https://my-first-proj.herokuapp.com/')
    .then(function(response){
      arr = response.data
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleUpdate(event){
    // event.preventDefault();
    // console.log(this.props.prop._id)
    await axios.patch(`https://my-first-proj.herokuapp.com/${this.props.prop._id}`,this.state)
    .then(function(response){
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error)
    })
    // this.forceUpdate()

    // this.componentWillUpdate()
    // this.render()
    
  }

  forms(){
  return(
  <fieldset>
  Type:  <input type='text' value={this.state.value} name='Type' placeholder={this.state.Type} onChange={this.handleChange}></input><br/>
  Name:  <input type='text' value={this.state.value} name='Name' placeholder={this.state.Name} onChange={this.handleChange}></input><br/>
  Input: <input type="text" value={this.state.value} name="Input" placeholder={this.state.Input}  onChange={this.handleChange}></input><br/>
  Output: <input type="text" value={this.state.value} name="Output" placeholder={this.state.Output}  onChange={this.handleChange}></input><br/>
  <textarea rows="4" cols="50" value={this.state.value} name="Description" placeholder={this.state.Description} onChange={this.handleChange}/>
  </fieldset>)
}

  
  render(){
  // this.read()
  
  // this.forceUpdate()
  return (
      <div>
        <h2>Update</h2>
        {this.forms()}
        <button class="alert alert-primary" onClick={this.handleUpdate}>Change</button>
      </div>
    );
  }  
}