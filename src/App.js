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

function read(){
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
    read()
  }

forms(){
  return(
    <form >
      <div class= "form-group">
        <label ><b>Type: </b></label> 
      <input type='text' value={this.state.value} name='Type' placeholder='Type' onChange={this.handleChange}></input><br/>
      {/* <div  style={{padding:'0px 42em 0px 45em'}}>
      <select class="form-control form-control-sm">
        <option>Algorithm</option>
        <option>Data Structure</option>
      </select><br/>
      </div> */}
      <label ><b>Name: </b></label>
      <input type='text' value={this.state.value} name='Name' placeholder='Name' onChange={this.handleChange}></input><br/>
      <label><b>Input: </b></label>
      <input type="text" value={this.state.value} name="Input" placeholder="Input"  onChange={this.handleChange}></input><br/>
      <label ><b>Output: </b></label>
      <input type="text" value={this.state.value} name="Output" placeholder="Output"  onChange={this.handleChange}></input><br/>
      <textarea rows="4" cols="50" value={this.state.value} name="Description" placeholder='Description' onChange={this.handleChange}/>
      </div>
    </form>
  )
}

componentDidMount(){
  // this.forceUpdate()
  // read()
}

 render(){
  read()
  
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

  async handleDelete(item){
    // event.preventDefault();
    await axios.delete(`https://my-first-proj.herokuapp.com/${item._id}`)
    .then(function(response){
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error)
    })
    read()
    // this.render()
  }

  render(){
    read()
    // this.forceUpdate()
    let x = arr.map((item, index)=>
      <div class='center' style={{paddingLeft:'30rem'}}>
        <div class='card col-sm-7' style={{background:'grey'}} key={index}>
        <h3>------------------------</h3>
        {/* <h3>ID: {item._id}</h3> */}
        <h3><u>Type:</u> <i>{item.Type}</i></h3>
        <h3><u>Name:</u> <i>{item.Name}</i></h3>
        <h3><u>Input:</u> <i>{item.Input}</i></h3>
        <h3><u>Output:</u> <i>{item.Output}</i></h3>
        <h3><u>Description:</u></h3> <h4><i>{item.Description}</i></h4>
        {/* <button onClick={this.handleUpdate}> Update</button> */}
        
        <button class="alert alert-danger"  onClick={()=>this.handleDelete(item)}>Delete</button>
        <Router>
          <Link  to="/Update"><button class="alert alert-primary">Update</button></Link>
          <Route exact path="/Update">
              <Update prop={item}/>
              
          </Route>
        </Router>
        <h3>------------------------</h3>
        </div>
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
    read()
  
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