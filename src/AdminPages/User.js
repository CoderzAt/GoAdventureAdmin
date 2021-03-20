import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { GET_EVENTLEVEL_BYID,GET_EVENTLEVEL,POST_EVENTLEVEL,PUT_EVENTLEVEL,GET_STATUS,DELETE_USER,GET_USERTYPES,DELETE_EVENTLEVEL,GET_USER,GET_USER_BYID, PUT_USER, POST_USER } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { getData, postData1, putData1, updatePropAccData,resetData,removedata,removeErrormsg, deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes';
import Displayerrormsg from '../Shared/DisplayErrorMsg'
import * as validation from "../Shared/Validations";
import Spinner1 from '../Components/Spinner1';

var errors={}
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            refreshflag: false,
            errors: {
                selectusertype: "",
                selectgender:"",
                selectlogintype:""
              }
        }
    }
    componentWillMount() {
        this.props.removeErrormsg()
        this.props.removedata("getuserbyid")
    }

    componentDidMount() {
        this.props.getData(action.GET_USER,GET_USER)
        this.props.getData(action.GET_USERTYPES,GET_USERTYPES)
        this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))
 
        //this.props.getData(action.GET_STATUS, GET_STATUS)
    }
    refresh(e) {
        e.preventDefault();
        this.props.getData(action.GET_USER,GET_USER)
    }
    deleteRecord(id) {
        debugger
        this.props.deleteRecord(action.DELETE_USER,DELETE_USER+id)
    }

    postUserData() {
        debugger
        const obj = {
            userId:this.props.getuserbyid.userId?this.props.getuserbyid.userId:0,
            userTypeId:this.props.getuserbyid.userTypeId*1,
            firstName:this.props.getuserbyid.firstName,
            middleName:this.props.getuserbyid.middleName,
            lastName:this.props.getuserbyid.lastName,
            gender:this.props.getuserbyid.gender,
            dateOfBirth: dateFormat(this.props.getuserbyid.dateOfBirth,"yyyy-mm-dd"),
            phoneNumber:this.props.getuserbyid.phoneNumber,
            emailId:this.props.getuserbyid.emailId,
            password:this.props.getuserbyid.password,
            addressInfo:this.props.getuserbyid.addressInfo,
            loginType:this.props.getuserbyid.loginType,
            createdBy:this.props.getuserbyid.userId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName,
            modifiedBy:this.props.getuserbyid.userId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null,
            isDeleted:this.props.getuserbyid.userId ? false : true
        };
        let url = PUT_USER+this.props.getuserbyid.userId;
        if (this.props.getuserbyid.userId) {
            this.props.putData1(action.PUT_USER, url, obj);
        }
        else {
            this.props.postData1(action.POST_USER, POST_USER, obj);
        }
        this.setState({ validated: false });
    }
    validateForm(errors) {
        debugger
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
      }
      handlevalidations() {
        let usertypeid = this.props.getuserbyid.userTypeId?this.props.getuserbyid.userTypeId:"0";
        let logintype= this.props.getuserbyid.loginType?this.props.getuserbyid.loginType:"0";
        let gender= this.props.getuserbyid.gender?this.props.getuserbyid.gender:"0";
        let usertypeiderror = validation.selectvalidation(usertypeid);
        let logintypeerror=validation.selectvalidation(logintype);
        let gendertypeerror=validation.selectvalidation(gender);
        this.setState({
            errors: {
                selectusertype:usertypeiderror,
                selectlogintype:logintypeerror,
                selectgender:gendertypeerror
            }
        })
        errors.selectusertype= usertypeiderror;
        errors.selectlogintype=logintypeerror;
        errors.selectgender=gendertypeerror
      }

    handleSubmit(event) {
        event.preventDefault();
        this.handlevalidations();
        const form = event.currentTarget;
        console.log("checkform", form.checkValidity());
        this.setState({ validated: true });
        if (form.checkValidity() === false  || this.validateForm(errors) === false ) {
            event.preventDefault();
            event.stopPropagation();
            window.scrollTo({
                top:0,
                behavior: 'smooth',
            })
        }
        else {
            event.preventDefault();
            this.postUserData();
        }
    }
    handleReset() {
        this.props.resetData(action.RESET_DATA, "getuserbyid");
        this.setState({ validated: false });
    }
    editReacord(id) {
        this.props.getData(action.GET_USER_BYID, GET_USER_BYID + id)
        window.scrollTo({
            top:0,
            behavior: 'smooth',
        })
    }
    updateUser = (e, paramName) => {

        this.props.updatePropAccData(paramName, e.target.value,"getuserbyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    render() {
        this.props.getData(action.GET_EVENTLEVEL, GET_EVENTLEVEL)
        return (
            <div>
                <div class="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
                    <Sidebar />

                    <div class="main-panel">
                        <div class="content-wrapper">

                            <div class="page-header">
                                <h3 class="page-title">
                                    <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                        <i class="mdi mdi-wan"></i>
                                    </span>User
                                </h3>
                                
                                <nav aria-label="breadcrumb">
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">
                                            User
                                         </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                    <div class="col-12 text-right"><span class="text-danger">*</span> <small class="very-small"> Fields Are Mandatory</small></div>
                                        <div class="card-body">
                                            <h4 class="card-title">User</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Type<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <select required type="text" value={this.props.getuserbyid.userTypeId ? this.props.getuserbyid.userTypeId : ""}
                                                                    class="form-control" onChange={(e) => this.updateUser(e, "userTypeId")} >
                                                                        <option value={0}>Select</option>
                                                                        {this.props.usertypes.map(obj=>(
                                                                            <option value={obj.userTypeId}>{obj.userTypeCode}</option>
                                                                        ))}
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectusertype}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">First Name<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getuserbyid.firstName ? this.props.getuserbyid.firstName : ""}
                                                                    class="form-control" onChange={(e) => this.updateUser(e, "firstName")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Middle Name</label>
                                                            <div class="col-sm-9">
                                                                <input  type="text" value={this.props.getuserbyid.middleName ? this.props.getuserbyid.middleName : ""}
                                                                    class="form-control" onChange={(e) => this.updateUser(e, "middleName")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label class="col-sm-3 col-form-label">Last Name<span class="text-danger">*</span></label>
                                                        <div class="col-sm-9">
                                                            <input required type="text" value={this.props.getuserbyid.lastName ? this.props.getuserbyid.lastName : ""}
                                                                class="form-control" onChange={(e) => this.updateUser(e, "lastName")} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label class="col-sm-3 col-form-label">Gender<span class="text-danger">*</span></label>
                                                        <div class="col-sm-9">
                                                            <select required type="text" value={this.props.getuserbyid.gender ? this.props.getuserbyid.gender : ""}
                                                                class="form-control" onChange={(e) => this.updateUser(e, "gender")} >
                                                                    <option value={0}>Select</option>
                                                                    <option value="male">Male</option>
                                                                    <option value="female">Female</option>
                                                                    <option value="others">Others</option>
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectgender}
                                                                </small>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label class="col-sm-3 col-form-label">Login Type<span class="text-danger">*</span></label>
                                                        <div class="col-sm-9">
                                                            <select required type="text" value={this.props.getuserbyid.loginType ? this.props.getuserbyid.loginType : ""}
                                                                class="form-control" onChange={(e) => this.updateUser(e, "loginType")} >
                                                                    <option value={0}>Select</option>
                                                                    <option value="goAdventure">GoAdventure</option>
                                                                    <option value="google">Google</option>
                                                                    <option value="facebook">FaceBook</option>
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectlogintype}
                                                                </small>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label class="col-sm-3 col-form-label">Date Of Birth<span class="text-danger">*</span></label>
                                                        <div class="col-sm-9">
                                                            <input required type="date" value={this.props.getuserbyid.dateOfBirth ? this.props.getuserbyid.dateOfBirth : ""}
                                                                class="form-control" onChange={(e) => this.updateUser(e, "dateOfBirth")} />
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Phone Number<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getuserbyid.phoneNumber ? this.props.getuserbyid.phoneNumber : ""}
                                                                    class="form-control" onChange={(e) => this.updateUser(e, "phoneNumber")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Email ID<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getuserbyid.emailId ? this.props.getuserbyid.emailId : ""}
                                                                    class="form-control" onChange={(e) => this.updateUser(e, "emailId")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Password<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getuserbyid.password?this.props.getuserbyid.password:""}
                                                                    class="form-control" onChange={(e) => this.updateUser(e, "password")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Address<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getuserbyid.addressInfo ? this.props.getuserbyid.addressInfo : ""}
                                                                    class="form-control" onChange={(e) => this.updateUser(e, "addressInfo")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                        <div class="row" style={{ margin: "auto", textAlign: "center"/* marg:auto;text-align: center} */ }}>
                                            <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                                            <button type="reset" class="btn btn-light">Cancel</button>
                                        </div>
                                        <br/>
                                        {this.props.ispostUserLoading || this.props.isputUserLoading?
                                            <Spinner1/>:
                                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>}
                                            </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Users<button onClick={(e) => this.refresh(e)} style={{ backgroundColor: "transparent", border: "none" }}><i class={"mdi mdi-refresh"}></i></button></h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[

                                        {
                                            Header: "Firs Name",
                                            accessor: "firstName",
                                            headerStyle: {
                                                textAlign: 'left',
                                                fontWeight: 'bold'
                                            }

                                        },
                                        {
                                            Header: "Middle Name",
                                            accessor: "middleName",
                                            headerStyle: {
                                                textAlign: 'left',
                                                fontWeight: 'bold'
                                            }

                                        },
                                        {
                                            Header: "Phone Number",
                                            accessor: "phoneNumber",
                                            headerStyle: {
                                                textAlign: 'left',
                                                fontWeight: 'bold'
                                            }

                                        },
                                        {
                                            Header: "Email ID",
                                            accessor: "emailId",
                                            headerStyle: {
                                                textAlign: 'left',
                                                fontWeight: 'bold'
                                            }

                                        },
                                        {
                                            id: 'id', // Required because our accessor is not a string
                                            Header: '',
                                            accessor: d => d.userId,
                                            maxWidth: 300,
                                            Cell: row => (
                                                <div className="template-demo">
                                                    <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                        <i class="mdi mdi-pencil-outline"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => { if (window.confirm('Are you sure to delete this record?')) { this.deleteRecord(row.value) }; }} value={row.value} >
                                                        <i class="mdi mdi-delete-outline"></i>
                                                    </button>

                                                </div>)

                                        }

                                    ]}
                                        data={this.props.getuser}
                                        showPagination={true}
                                        defaultPageSize={25}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                </div >

            </div >


        )
    }
}

const mapStateToProps = (state) => {
    return {
        getuser: state.goAdvStore.getuser,
        getuserbyid: state.goAdvStore.getuserbyid,
        getstatus: state.goAdvStore.getstatus,
        usertypes:state.goAdvStore.usertypes,
        message: state.goAdvStore.message,
        getuserbyidprofile:state.goAdvStore.getuserbyidprofile,
        messageData: state.goAdvStore.messageData,
        ispostUserLoading:state.goAdvStore.ispostUserLoading,
        isputUserLoading:state.goAdvStore.isputUserLoading
    }
}

export default connect(mapStateToProps, {getData,removedata,postData1, putData1, updatePropAccData, resetData, removeErrormsg, deleteRecord })(User);


    //export default Eventlevel

