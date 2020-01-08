import React from "react";

var State

export default function form(obj){
    // State=obj
    return (
        <fieldset>
            Type:  <input type='text' name='Type' placeholder={obj.Type} onChange={handleChange}></input><br/>
            Name:  <input type='text' name='Name' placeholder={obj.Name} onChange={handleChange}></input><br/>
            Input: <input type="text" name="Input" placeholder={obj.Input} onChange={handleChange}></input><br/>
            Output: <input type="text" name="Output" placeholder={obj.Output} onChange={handleChange}></input><br/>
            <textarea rows="4" cols="50" name="Description" placeholder={obj.Description} onChange={handleChange}/>
        
        </fieldset>
        // ,State
    )
  }

function handleChange(event){
    // console.log(State)
    State=({
      [event.target.name]: event.target.value
    });
    console.log('in handler')
    // console.log(State)
  }

// module.export ={
//   form,
// }