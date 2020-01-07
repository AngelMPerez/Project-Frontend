// import React from "react";
import axios from 'axios';

var arr=[]

export default function read(){
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
    // console.log('read in list')

    return arr
  }
