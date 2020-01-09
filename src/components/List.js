import React from "react";
import axios from 'axios';
import Update from './Update'

import {
    BrowserRouter as Router,
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
    .then(function(response){
      arr = response.data 
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })
    return arr
  }
  
export default class List extends React.Component{
      state = { 
        x:[]
      }
   
    

    async handleDelete(item){
      // event.preventDefault();
      await axios.delete(`https://my-first-proj.herokuapp.com/${item}`)
      .then(function(response){
        console.log(response.data)
      })
      .then(()=>{
        // this.read()
        this.reRender()
        // console.log('calling read')
      })
      .catch(function(error){
        console.log(error)
      })
    }

    reRender(){
       this.setState({ x : read()})
    }

    componentDidMount(){
      // this.read()
      this.reRender()
    }
  
    render(){
      return(
      <div>
        <h2>List</h2>
        {this.state.x.map((item, index)=>
        <div  style={{paddingLeft:'30em'}}  key={index}>
          <div className='col-sm-6' style={{background:'grey'}}>
          <h3>------------------------</h3>
          {/* <h3>ID: {item._id}</h3> */}
          <h3><u>Type:</u> <i>{item.Type}</i></h3>
          <h3><u>Name:</u> <i>{item.Name}</i></h3>
          <h3><u>Input:</u> <i>{item.Input}</i></h3>
          <h3><u>Output:</u> <i>{item.Output}</i></h3>
          <h3><u>Description:</u></h3> <h4><i>{item.Description}</i></h4>
          {console.log('reRender',index)}    
          <button className="alert alert-danger" onClick={()=>this.handleDelete(item._id)}> Delete </button>
          <Router>
            <Link  to="/Update"><button className="alert alert-primary">Update</button></Link>
            <Route exact path="/Update">
                <Update prop={item}/>
                
            </Route>
          </Router>
          <h3>------------------------</h3>
          </div>
        </div>
      )}    
      </div>
      );
    }
  }
  
