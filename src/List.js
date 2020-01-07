import React from "react";
import axios from 'axios';

import read from './read'

import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

// function read(){
//     // axios.interceptors.request.use(config => {
//     //   // log a message before any HTTP request is sent
//     //   console.log('Request was sent');
//     //   return config;
//     // });
//     axios.get('https://my-first-proj.herokuapp.com/')
//     .then(function(response){
//       arr = response.data
//       console.log(response)
//     })
//     .catch(function(error){
//       console.log(error)
//     })
//     console.log('read in list')
//   }

export default class List extends React.Component{

    async handleDelete(item){
      // event.preventDefault();
      await axios.delete(`https://my-first-proj.herokuapp.com/${item._id}`)
      .then(function(response){
        console.log(response.data)
      })
      .catch(function(error){
        console.log(error)
      })
      // this.componentDidMount()
      // this.render()
      read()
    }
  
    // componentDidMount(){
    //   read()
    // }
  
    render(){
    //   this.componentDidMount()
    let arr = read()
      let x = arr.map((item, index)=>
        <div  style={{paddingLeft:'30rem'}}  key={index}>
          <div className='col-sm-6' style={{background:'grey'}}>
          <h3>------------------------</h3>
          {/* <h3>ID: {item._id}</h3> */}
          <h3><u>Type:</u> <i>{item.Type}</i></h3>
          <h3><u>Name:</u> <i>{item.Name}</i></h3>
          <h3><u>Input:</u> <i>{item.Input}</i></h3>
          <h3><u>Output:</u> <i>{item.Output}</i></h3>
          <h3><u>Description:</u></h3> <h4><i>{item.Description}</i></h4>
          
          <button className="alert alert-danger"  onClick={()=>this.handleDelete(item)}>Delete</button>
          <Router>
            <Link  to="/Update"><button className="alert alert-primary">Update</button></Link>
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