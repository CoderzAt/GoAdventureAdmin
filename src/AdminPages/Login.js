import React, { Component } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import { Form } from 'react-bootstrap';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
//import AppRoutes from './src/app/AppRoutes';
//import imageUrl from '../Pages/place-1.jpg'

import {GET_TOKEN} from '../Shared/Services'
import { connect } from 'react-redux';
import { updatePropAccData} from '../Adminstore/actions/goAdvActions';
import * as actions from '../Adminstore/actions/actionTypes';


export class Login extends Component {
 constructor(props)
  {
  super(props);
  this.state = {
    email:null,
    password:null,
    token:[],
    tokenvalue1:null,
    validated:false,
    error:null,
    redirect:false,
    refreshflag:false
  }
}
/* async handlesignup(event)
{
  let json;
  debugger
  event.preventDefault();
  
  const form = event.currentTarget;
  console.log("checkform",form.checkValidity())
  if(form.checkValidity() === false)
  {
    event.preventDefault();
    event.stopPropagation();
  }
  else
  {
 const obj={
  email:this.state.email,
  password:this.state.password
  }

const response=await fetch('https://datamasterapi.azurewebsites.net/api/Token', {
method:'Post',
body: JSON.stringify(obj),
headers: {
  "Content-type": "application/json; charset=UTF-8"
}
})
if(response.status === 200)
{

//alert("its working success123 ")
console.log("result",response)
json=await response.json();
var result=Object.values(json)[0]
let tokenvalue='Bearer '+result;
await console.log("json",result)
localStorage.setItem("token",tokenvalue) 
this.setState({
  tokenvalue1:tokenvalue
})

this.setState({
  redirect:true
})
}
else if(response.status==400)
{
  this.setState({
    error:"Email or Password is wrong"
  })
  event.preventDefault();
  event.stopPropagation();
}
}
this.setState({
  validated:true
})

} */

/* responseGoogle=(response)=>
{
  debugger
 console.log("response",response);
  
  console.log(response);
  if (!response.tokenId) {
    console.error("Unable to get tokenId from Google", response)
    return;
  }
 
  let obj={
  emailId:response.profileObj.email,
  firstName:response.profileObj.givenName,
  lastName:response.profileObj.familyName,
  dateOfBirth:"1998-05-04",
  userTypeId: 1,
  password:"rajendar98"
}
console.log("responceobj",obj)

  this.props.googleLogin(actions.GOOGLE_LOGIN,GET_TOKEN,obj)
}
 
componentClicked=(data)=>
{
  console.log("data-fa",data)
} 
responseFacebook=(response)=>
{
  debugger
  console.log("facebookdata",response);

  let obj={
    emailId:response.email,
    firstName:response.name,
    lastName:"",
    dateOfBirth:"1998-05-04",
    userTypeId: 1,
    password:"string"
  }
  console.log("facebookobj",obj)
  //this.props.googleLogin(actions.FACEBOOK_LOGIN,GET_TOKEN,obj)


}
 */
login()
{
  let obj={
    emailId:this.props.logindata.eamil,
    firstName:"rajendar",
    lastName:"prathapagiri",
    dateOfBirth:"1998-05-04",
    userTypeId: 1,
    password:this.props.logindata.password
  }

  console.log("data",obj)

}
handleSignin(event)
{
  event.preventDefault();
  
  const form = event.currentTarget;
  console.log("checkform",form.checkValidity())
  if(form.checkValidity() === false)
  {
    event.preventDefault();
    event.stopPropagation();
  }
  else
  {
    this.login()
  }

}
updateLogindata(e,paramName)
{
  debugger
  this.props.updatePropAccData(paramName, e.target.value,"logindata");
  this.setState({ refreshflag: !this.state.refreshflag });
}

render() {
      return (
        <div style={{backgroundImage: `url(img/trip-details-images/Meghalaya-04.jpeg)`,paddingTop:90 }}>
         
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div /* style={{backgroundColor:"rgba(6, 10, 2, 0.8)"}} */ className=" text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                
                  
                </div>
                <h3 style={{color:"blue"}}>Hello! let's get started</h3>
                <h5 style={{color:"green"}}>Sign in to continue.</h5>
                <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handlesignup(e)}  >
                  <Form.Group className="d-flex search-field">
                    <input required type="email" value={this.props.logindata.email?this.props.logindata.email:""} placeholder="Email" onChange={(e)=>this.updateLogindata(e,"email") } className="form-control" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control required type="password" placeholder="Password" onChange={(e)=>this.updateLogindata(e,"password") }  className="form-control"/>
              </Form.Group> 
              </Form>
              <div style={{color:"red"}}>
              {this.state.error}
              </div> 
              <button type="submit" className="btn btn-primary mr-2" onClick={(e)=>this.handleSignin(e)}>SIGN IN</button>
                   {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="text-primary">Forgot password?</a>
                  </div> */}
                 {/*  <div style={{color:"rgba(265, 6, 0, 0.5)"}} className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/regester" className="text-primary">Create</Link>
                  </div> */}
                  
               {/*  </Form> */}
              </div>
            </div>
          </div>
        </div>  
     </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
     
      logindata:state.goAdvStore.logindata
  }
}
export default connect(mapStateToProps, {updatePropAccData })(Login);

