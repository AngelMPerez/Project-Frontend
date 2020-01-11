import React from "react";
import axios from 'axios';
// import List from './List'
// import read from './read'
// import form from './form'


export default class Update extends React.Component{
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

    // reRender(){
    //     this.setState({ x : read()})
    //  }
  
    // componentDidMount(){
    //     this.reRender()
    //   }
    

    async handleUpdate(event){
      event.preventDefault();
      // console.log(this.props.prop._id)
      await axios.patch(`https://my-first-proj.herokuapp.com/${this.props.prop._id}`,this.state)
      .then(function(response){
        console.log(response.data)
      })
      .then(()=>this.props.redirect())
      .catch(function(error){
        console.log(error)
      })   

    }
  
    forms(){
      return(
        <fieldset>
          Type:  <input type='text' name='Type' placeholder={this.state.Type} onChange={this.handleChange}></input><br/>
          Name:  <input type='text' name='Name' placeholder={this.state.Name} onChange={this.handleChange}></input><br/>
          Input: <input type="text" name="Input" placeholder={this.state.Input}  onChange={this.handleChange}></input><br/>
          Output: <input type="text" name="Output" placeholder={this.state.Output}  onChange={this.handleChange}></input><br/>
          <textarea rows="4" cols="50" name="Description" placeholder={this.state.Description} onChange={this.handleChange}/>
        </fieldset>
      )
    }
  
    render(){
    // let y = form(this.state)
    return (
        <div>
          <h2>Update</h2>
          {this.forms()}
          {/* {y} */}
          <button className="alert alert-primary" onClick={this.handleUpdate}>Change</button>
        </div>
      );
    }  
  }