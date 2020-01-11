import React from "react";
import axios from 'axios';
import '../fix.css'
// import Update from './Update'

// import {
//     BrowserRouter as Router,
//     Route,
//     Link
//   } from "react-router-dom";

export default class List extends React.Component{
      state = { 
        x:[],
      }
   
    read(){
      // axios.interceptors.request.use(config => {
      //   // log a message before any HTTP request is sent
      //   console.log('Request was sent');
      //   return config;
      // });
      axios.get('https://my-first-proj.herokuapp.com/')
      .then((response)=>{
        this.setState({x:response.data})
      })
      .catch(function(error){
        console.log(error)
      })
    }

    // handleChange(event){
    //   this.setState({
    //     [event.target.name]: event.target.value
    //   });
    // }

    //  y = ()=>{this.read()}
    async handleDelete(item){
      // event.preventDefault();
      await axios.delete(`https://my-first-proj.herokuapp.com/${item}`)
      .then(function(response){
        console.log(response.data)
      })
      .then(()=>{
        this.read()
      })
      .catch(function(error){
        console.log(error)
      })
    }

    // async handleUpdate(event){
    //   event.preventDefault();
    //   // console.log(this.props.prop._id)
    //   await axios.patch(`https://my-first-proj.herokuapp.com/${this.state._id}`,this.state)
    //   .then(function(response){
    //     console.log(response.data)
    //   })
    //   .then(()=>this.props.redirect())
    //   .catch(function(error){
    //     console.log(error)
    //   })   
    // }

    componentDidMount(){
      // this.props.read()
      this.read()
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

          {/* <!-- Button trigger modal --> */}
      <button type="button" className="alert alert-primary" data-toggle="modal" data-target='#exampleModal'>
        Update
      </button>

      {/* <!-- Modal --> */}
      <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal-backdrop" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <fieldset>
                Type:  <input type='text' name='Type' placeholder={item.Type} onChange={this.handleChange}></input><br/>
                Name:  <input type='text' name='Name' placeholder={item.Name} onChange={this.handleChange}></input><br/>
                Input: <input type="text" name="Input" placeholder={item.Input}  onChange={this.handleChange}></input><br/>
                Output: <input type="text" name="Output" placeholder={item.Output}  onChange={this.handleChange}></input><br/>
                <textarea rows="4" cols="50" name="Description" placeholder={item.Description} onChange={this.handleChange}/>
              </fieldset>
          
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" >Save changes</button>
            </div>
          </div>
        </div>
      </div>
          
          {/* <Router>
            <Link  to="/Update"><button className="alert alert-primary">Update</button></Link>
            <Route exact path="/Update">
                <Update prop={item} redirect={()=>this.props.redirect()}/>
                
            </Route>
          </Router> */}
          <h3>------------------------</h3>
          </div>
        </div>
      )}    
      </div>
      );
    }
  }
  
