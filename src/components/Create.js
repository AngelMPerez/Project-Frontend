import React from "react";
import axios from 'axios';

// var  state={
//   Type:'d',
//   Name:'d',
//   Input:'d',
//   Output:'d',
// };

export default class Create extends React.Component{
    constructor(props){
      super(props);
      this.state={};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
      // this.setState
      this.setState({
        [event.target.name]: event.target.value
      });
      // console.log(this.state)
    }    
  
    async handleSubmit(){
    //   event.preventDefault();
      await axios.post('https://my-first-proj.herokuapp.com/',this.state)
      .then(function (response) {
      //  arr=response.config.data
      console.log(response.config.data);
      })
      .then(this.props.redirect())
      // .then(this.renderList())
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      // read()
    //   console.log(arr)
    }
  

  forms(){
    return(
      <form >
        <div className= "form-group">
          <label ><b>Type: </b></label> 
        <input type='text' name='Type' placeholder='Type' onChange={this.handleChange}></input><br/>
        {/* <div  style={{padding:'0px 42em 0px 45em'}}>
        <select class="form-control form-control-sm">
          <option>Algorithm</option>
          <option>Data Structure</option>
        </select><br/>
        </div> */}
        <label ><b>Name: </b></label>
        <input type='text'  name='Name' placeholder='Name' onChange={this.handleChange}></input><br/>
        <label><b>Input: </b></label>
        <input type="text"  name="Input" placeholder="Input"  onChange={this.handleChange}></input><br/>
        <label ><b>Output: </b></label>
        <input type="text"  name="Output" placeholder="Output"  onChange={this.handleChange}></input><br/>
        <textarea rows="4" cols="50"  name="Description" placeholder='Description' onChange={this.handleChange}/>
        </div>
      </form>
    )
  }
  
  componentDidMount(){
    // read()
  }
  
   render(){
    // this.componentDidMount()
    // read()
    return (
        <div style={{textAlign:'center'}}>
          {/* <h2>Create</h2> */}
          {this.forms()}
              <button className="alert alert-success" role="alert" onClick={this.handleSubmit}>Create</button>            
        </div>
      );
    }
  }
  