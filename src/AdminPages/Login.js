import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { postData, GET_ALL_ACCESSORIES,GET_STATUS,POST_ACCESSORIES, PUT_ACCESSORIES, GET_ACCESSORIES_BYID,DELETE_ACCESSORIES,ACCESSARY_TYPE,GET_TOKEN } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getAccessories, getData, postData1, putData1, updatePropAccData, resetData,deleteRecord,postDataWithFile,putDataWithFile } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'
import { Redirect } from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
           email:"",
           password:"",
           validated:false
        }
    }
   /*  componentWillMount()
    {
      this.props.updatePropAccData("status",false,"loginmsgdata")
    } */
   async login()
    {
      let obj={
        emailId:this.state.email,
        firstName:"rajendar",
        lastName:"prathapagiri",
        dateOfBirth:"1998-05-04",
        loginType:"Google",
        password:this.state.password
      }
    
     await this.props.postData1(action.ADMIN_LOGIN,GET_TOKEN,obj)
    
     //this.props.history.push("/");
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
      this.setState({
        validated:true
      })
    
    }
    
    render() {
      debugger 
      console.log("status",this.props.loginmsgdata.status)
      console.log("data",localStorage.getItem("GoAdventureLoginToken"));
        return (
          <div>
          {this.props.loginmsgdata.status === "success"?<Redirect to="/"/>:null}
          
          <div style={{backgroundImage: `url(img/trip-details-images/Meghalaya-04.jpeg)`,paddingTop:90 }}>
           
         <div className="d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div /* style={{backgroundColor:"rgba(6, 10, 2, 0.8)"}} */ className=" text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                  </div>
                  <h3 style={{color:"blue"}}>Hello! let's get started</h3>
                  <h5 style={{color:"green"}}>Sign in to continue.</h5>
                  <h6 style={{color:"red"}}>{this.props.loginmsgdata.msg}</h6>
                  <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handlesignup(e)}  >
                    <Form.Group className="d-flex search-field">
                      <Form.Control required type="email" value={this.state.email?this.state.email:""} placeholder="Email" onChange={(e)=>this.setState({email:e.target.value}) } className="form-control" />
                    </Form.Group>
                    <Form.Group className="d-flex search-field">
                      <Form.Control required type="password" value={this.state.password?this.state.password:""} placeholder="Password" onChange={(e)=>this.setState({password:e.target.value}) }  className="form-control"/>
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
          </div>
       
        )
}
}

const mapStateToProps = (state) => {
    return {
      logintoken:state.goAdvStore.logintoken,
      userid:state.goAdvStore.userid,
      loginmsgdata:state.goAdvStore.loginmsgdata
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData,deleteRecord,postDataWithFile,putDataWithFile })(Login);


    //export default Accessories

