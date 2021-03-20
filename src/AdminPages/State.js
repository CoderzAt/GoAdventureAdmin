import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { postData, statepostapi, loadData, getcounties, getstates,getstatebyid,GET_USER_BYID,stateupdateapi, getallstatebycountry, POST_STATE, GET_STATE_BYID, GET_STATES, PUT_STATE, GET_STATE_BYCOUNTRYID,GET_COUNTRIES,DELETE_STATE } from '../Shared/Services'
import Sidebar from './Sidebar'

import TableWithSelection from '../Components/TablewithdataSelection'
import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removedata,removeErrormsg,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'
import * as validation from "../Shared/Validations";
import Spinner1 from '../Components/Spinner1';



var valuefromurl
var countryfromurl
var errors={}
/* const countries=[{countryid:1,countryname:"india",available:"<p style={{colour:'red'}}>available<p>"},
{countryid:2,countryname:"india",available:"<p style={{colour:'red'}}>available<p>"}] */
class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      countrynames: [],
      statename: null,
      statedescription: null,
      statecode: null,
      countryid: 1,
      states: [],
      editData: [],
      countryname: null,
      errors:{
        selectcountry:""
      }
    
    }
  }
  componentWillMount()
    {
      this.props.removeErrormsg()
      this.props.removedata("getstatebyid")
     }
    componentDidMount() 
    {
debugger
     
    var url
   if (this.props.match.params.sid != undefined) {
      valuefromurl = parseInt(this.props.match.params.sid);
      url = GET_STATE_BYCOUNTRYID + valuefromurl;
      countryfromurl=valuefromurl;
      this.props.getData(action.GET_STATE_BYCOUNTRYID, url)
    }
    else 
    {
      this.props.getData(action.GET_STATES, GET_STATES)
      //url=getstates
    }
    this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)
    this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))
     }
    statebycountryoperation(event) {
     
    valuefromurl=event.target.value
    let url = GET_STATE_BYCOUNTRYID + (event.target.value);
    this.props.getData(action.GET_STATE_BYCOUNTRYID, url)
    }
  postStateData()
  {
    debugger
    const obj = {
      stateId:this.props.getstatebyid.stateId?this.props.getstatebyid.stateId:0,
      stateName: this.props.getstatebyid.stateName,
      stateCode: this.props.getstatebyid.stateCode,
      stateDesc: this.props.getstatebyid.stateDesc,
      countryId: this.props.getstatebyid.countryId*1,
      createdBy:this.props.getstatebyid.stateId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName,
      modifiedBy:this.props.getstatebyid.stateId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null,
      isDeleted: this.props.getstatebyid.stateId?false:true
      };
    let url = PUT_STATE+ this.props.getstatebyid.stateId;
    if (this.props.getstatebyid.stateId) {
        this.props.putData1(action.PUT_STATE,url,obj);
    }
    else {
        this.props.postData1(action.POST_STATE,POST_STATE,obj);
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
     let countryid= this.props.getstatebyid.countryId?this.props.getstatebyid.countryId:"0";
     let countryerror=validation.selectvalidation(countryid);
    this.setState({
        errors: {
            selectcountry:countryerror
        }
    })
    errors.selectcountry=countryerror
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
          top:100,
          behavior: 'smooth',
      })
    }
    else {
        event.preventDefault();
        this.postStateData();
    }   
}
  handleReset() {
    this.props.resetData(action.RESET_DATA,"getstatebyid");
        this.setState({ validated: false });
  }
  editReacord(id) {
    this.props.getData(action.GET_STATE_BYID, GET_STATE_BYID+id)
    window.scrollTo({
      top:100,
      behavior: 'smooth',
  })
}
refresh(e)
{
  
  e.preventDefault()
  if(valuefromurl && valuefromurl !=="0")
  {
  valuefromurl=valuefromurl;
  this.props.getData(action.GET_STATE_BYCOUNTRYID,GET_STATE_BYCOUNTRYID+(valuefromurl*1))
  }
  else
  {
    valuefromurl="0"
    this.props.getData(action.GET_STATES,GET_STATES)
  }
}
  updateState = (e, paramName) => { 
    this.props.updatePropAccData(paramName,e.target.value,"getstatebyid");
    this.setState({ refreshflag: !this.state.refreshflag });
}
deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_STATE,DELETE_STATE+id)
    }
  render() {
    return (
      <div>
        {/* <AdminHeader/> */}
        <div class="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
          <Sidebar />

          <div class="main-panel">
            <div class="content-wrapper">
              <div class="page-header">
                <h3 class="page-title">
                  <span class="page-title-icon bg-gradient-primary text-white mr-2">
                    <i class="mdi mdi-home-map-marker"></i>
                  </span> State
                        </h3>
                        
                <nav aria-label="breadcrumb">
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      State
                                </li>
                  </ul>
                </nav>
              </div>
              <div class="row">
                <div class="col-12 grid-margin stretch-card">
                  <div class="card">
                  <div class="col-12 text-right"><span class="text-danger">*</span> <small class="very-small"> Fields Are Mandatory</small></div>
                    <div class="card-body">
                      <h4 class="card-title">State</h4>
                      <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-3 col-form-label">Country<span class="text-danger">*</span></label>
                              <div class="col-sm-9">
                                <select class="form-control travellerMode" value={this.props.getstatebyid.countryId?this.props.getstatebyid.countryId:"0"} 
                                onChange={(e) => this.updateState(e,"countryId")}>
                                  <option value={0}>Select</option>
                                  {this.props.countries.map(obj =>
                                    <option value={obj.countryId}>{obj.countryName}</option>
                                  )}
                                </select>
                                <small style={{ color: "red" }}>
                                  {this.state.errors.selectcountry}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-3 col-form-label">Name<span class="text-danger">*</span></label>
                              <div class="col-sm-9">
                                <input type="text" required value={this.props.getstatebyid.stateName?this.props.getstatebyid.stateName:""} 
                                class="form-control" onChange={(e) => this.updateState(e,"stateName")} />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-3 col-form-label">Code<span class="text-danger">*</span></label>
                              <div class="col-sm-9">
                                <input type="text" required value={this.props.getstatebyid.stateCode?this.props.getstatebyid.stateCode:""} 
                                class="form-control" onChange={(e) => this.updateState(e,"stateCode")} />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                              <div class="col-sm-9">
                                <textarea class="form-control" value={this.props.getstatebyid.stateDesc?this.props.getstatebyid.stateDesc:""} id="placeTypeDescription" 
                                rows="4" onChange={(e) => this.updateState(e,"stateDesc")}></textarea>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div class="row" style={{ margin: "auto", textAlign: "center"/* marg:auto;text-align: center} */ }}>
                          <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                          <button type="reset" class="btn btn-light">Cancel</button>
                        </div>
                        <br/>
                        {this.props.ispostStateLoading || this.props.isputStateLoading?
                                            <Spinner1/>:
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>}
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <TableWithSelection 
                   selectTitle={"Country"}
                   selectdata={this.state.countrynames} 
                   selectValue={"countryId"} 
                   selectName={"countryName"}
                   selectonChange={(e)=>this.statebycountryoperation(e)}

                   header1={"StateId"}
                   accessor1={"stateId"}
                   header2={"StateName"}
                   accessor2={"stateName"}
                   actionId={"stateId"}
                   editonClick={(row)=>this.editReacord(row.value)}
                   deleteonClick={(row)=>this.deleteRecord(row.value)}
                   child={"city"}
                   tabledata={this.state.states}
                   
                   /> */}
              <div class="row">
                <div class="col-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">List<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Country</label>
                          <div class="col-sm-9">
                            <select class="form-control travellerMode" value={valuefromurl?valuefromurl:"0"}  onChange={(e) => this.statebycountryoperation(e)}>
                              <option value={0}>Select</option>
                              {this.props.countries.map(obj =>
                                <option value={obj.countryId}>{obj.countryName}</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <TableWithSelection />
                        <ReactTable columns={[
                         /* {
                            Header: "StateId",
                            accessor: "stateId"

                          },*/
                          {
                            Header: "Name",
                            accessor: "stateName",
                            headerStyle: {
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }

                          },
                          {
                            Header: "Code",
                            accessor: "stateCode",
                            headerStyle: {
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }

                          },
                          {
                            Header: "Description",
                            accessor: "stateDesc",
                            headerStyle: {
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }

                          },
                          {
                            id: 'id', // Required because our accessor is not a string
                            Header: '',
                            accessor: d => d.stateId,
                            maxWidth: 300,
                            Cell: row => (
                              <div className="template-demo">
                                <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                  <i class="mdi mdi-pencil-outline"></i>
                                </button>
                                <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                  <i class="mdi mdi-delete-outline"></i>
                                </button>
                                <button type="button" class="btn btn-icon" value={row.value} >
                                  <Link  to={`/admin/city/${row.value}`}>Cities</Link>
                                </button>
                              </div>)

                          }

                        ]}
                          data={this.props.states}
                          showPagination={true}
                          defaultPageSize={25}

                        />
                      </div>
                    </div>
                  </div>
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
    states: state.goAdvStore.states,
    countries:state.goAdvStore.countries,
    getstatebyid:state.goAdvStore.getstatebyid,
    message: state.goAdvStore.message,
    getuserbyidprofile:state.goAdvStore.getuserbyidprofile,
    messageData: state.goAdvStore.messageData,
    ispostStateLoading:state.goAdvStore.ispostStateLoading,
    isputStateLoading:state.goAdvStore.isputStateLoading

}
}
export default connect(mapStateToProps, { getData, postData1,removedata,putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord})(State);
   // export default State

