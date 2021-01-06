import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {GET_TRAVELINFO_BYID,GET_TRAVELINFO,PUT_TRAVELONFO,POST_TRAVELINFO,GET_CITIES,DELETE_TRAVELINFO,GET_TRAVELTYPE,GET_CITY_STATEID,GET_COUNTRIES,GET_STATE_BYCOUNTRYID, GET_STATES} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar';

import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'


var condition=false;
class TravelInfo extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           refreshflag:false
            }
    }
    componentWillMount()
    {
      this.props.removeErrormsg()
  
    }
   componentDidMount()
     {
    
        this.props.getData(action.GET_TRAVELINFO,GET_TRAVELINFO)
        //this.props.getData(action.GET_CITIES,GET_CITIES)
        this.props.getData(action.GET_TRAVELTYPE,GET_TRAVELTYPE)
        this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)
     }  
     refresh(e)
    {
        e.preventDefault();
        this.props.getData(action.GET_TRAVELINFO,GET_TRAVELINFO)
    }
    postTravelinfoData()
    {
    debugger
    const obj = {
            travelInfoId:this.props.gettravelinfobyid.travelInfoId?this.props.gettravelinfobyid.travelInfoId:0,
            vehicleNumber:this.props.gettravelinfobyid.vehicleNumber,
            vehicleName:this.props.gettravelinfobyid.vehicleName,
            vehicleOwner:this.props.gettravelinfobyid.vehicleOwner,
            vehicleContactNumber:this.props.gettravelinfobyid.vehicleContactNumber,
            agencyName:this.props.gettravelinfobyid.agencyName,
            locationDetails:this.props.gettravelinfobyid.locationDetails,
            //traveltype:this.props.gettravelinfobyid.traveltype,
            cityId:this.props.gettravelinfobyid.cityId*1,
            isDeleted: this.props.gettravelinfobyid.travelInfoId?false:true
       };
    let url = PUT_TRAVELONFO+ this.props.gettravelinfobyid.travelInfoId;
    if (this.props.gettravelinfobyid.travelInfoId) {
        this.props.putData1(action.PUT_TRAVELINFO,url,obj);
    }
    else {
        this.props.postData1(action.POST_TRAVELINFO,POST_TRAVELINFO,obj);
    }
    this.setState({ validated: false });
    }
     handleSubmit(event)
    {
    event.preventDefault();
    //this.handlevalidations();
    const form = event.currentTarget;
    console.log("checkform", form.checkValidity());
    this.setState({ validated: true });
    if (form.checkValidity() === false /* || this.validateForm(this.state.errors) === false */) {
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        event.preventDefault();
        this.postTravelinfoData();
    }   
  } 
 
    handleReset() {
        this.props.resetData(action.RESET_DATA,"gettravelinfobyid");
            this.setState({ validated: false });
      }
   async editReacord(id) {
        await this.props.getData(action.GET_CITIES,GET_CITIES)
        await  this.props.getData(action.GET_STATES,GET_STATES)
        this.props.getData(action.GET_TRAVELINFO_BYID, GET_TRAVELINFO_BYID+id)
    }
    updateTravelinfo = (e, paramName) => {

        if(paramName === "countryId")
        {
            this.props.getData(action.GET_STATE_BYCOUNTRYID,GET_STATE_BYCOUNTRYID+e.target.value)
            this.props.updatePropAccData("cityId",undefined,"gettravelinfobyid");
        }
        else if(paramName === "stateId")
        {
            this.props.getData(action.GET_CITY_STATEID,GET_CITY_STATEID+e.target.value)
        }

        this.props.updatePropAccData(paramName,e.target.value,"gettravelinfobyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_TRAVELINFO,DELETE_TRAVELINFO+id)
    }
    render() {
	    return (
         <div>
        <div class="container-fluid page-body-wrapper" style={{paddingTop:80}}>
            <Sidebar/>
            
            <div class="main-panel">
                <div class="content-wrapper">
                    
                     <div class="page-header">
                        <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                <i class="mdi mdi-wan"></i>
                            </span> Travel Info
                        </h3>
                        {this.props.message ?
                                    <div className={`message-wrapper ${this.props.messageData.isSuccess ? "success" : "error"}`}>{this.props.messageData.message}</div> :
                                    null
                        }
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Travel Info
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Travel Info</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Vehicle Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.gettravelinfobyid.vehicleName?this.props.gettravelinfobyid.vehicleName:""}
                                                         class="form-control" onChange={(e)=>this.updateTravelinfo(e,"vehicleName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">

                                                    <label class="col-sm-3 col-form-label">TravelType</label>
                                                    <div class="col-sm-9">
                                                        <select required type="text" value={this.props.gettravelinfobyid.traveltype?this.props.gettravelinfobyid.traveltype:""}
                                                         class="form-control" onChange={(e)=>this.updateTravelinfo(e,"traveltype")}>
                                                             <option value={0}>Select</option>
                                                             {this.props.gettraveltype.map(obj=>(
                                                                 <option value={obj.travelTypeId}>{obj.travelTypeName}</option>
                                                             ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Vehchile Number</label>

                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.gettravelinfobyid.vehicleNumber?this.props.gettravelinfobyid.vehicleNumber:""} 
                                                        class="form-control" onChange={(e)=>this.updateTravelinfo(e,"vehicleNumber")}/>
                                                    </div>
                                                </div>
                                            </div>
                                       
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Vehicle Owner</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  value={this.props.gettravelinfobyid.vehicleOwner?this.props.gettravelinfobyid.vehicleOwner:""} 
                                                        class="form-control"  onChange={(e)=>this.updateTravelinfo(e,"vehicleOwner")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Contact number</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.gettravelinfobyid.vehicleContactNumber?this.props.gettravelinfobyid.vehicleContactNumber:""} 
                                                         class="form-control"  onChange={(e)=>this.updateTravelinfo(e,"vehicleContactNumber")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Agency Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.gettravelinfobyid.agencyName?this.props.gettravelinfobyid.agencyName:""}  class="form-control"  
                                                        onChange={(e)=>this.updateTravelinfo(e,"agencyName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Location Details</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.gettravelinfobyid.locationDetails?this.props.gettravelinfobyid.locationDetails:""}  
                                                        class="form-control"  onChange={(e)=>this.updateTravelinfo(e,"locationDetails")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Country</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.gettravelinfobyid.countryId?this.props.gettravelinfobyid.countryId:"0"} 
                                                    onChange={(e)=>this.updateTravelinfo(e,"countryId")}>
                                                        <option value={0}>Select</option>
                                                       {this.props.countries.map(obj=>
                                                      <option value={obj.countryId}>{obj.countryName}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">State</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.gettravelinfobyid.stateId?this.props.gettravelinfobyid.stateId:"0"} 
                                                    onChange={(e)=>this.updateTravelinfo(e,"stateId")}>
                                                        <option value={0}>Select</option>
                                                       {(this.props.gettravelinfobyid.countryId?this.props.states:[]).map(obj=>
                                                      <option value={obj.stateId}>{obj.stateName}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">City</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.gettravelinfobyid.cityId?this.props.gettravelinfobyid.cityId:"0"} 
                                                    onChange={(e)=>this.updateTravelinfo(e,"cityId")}>
                                                        <option value={0}>Select</option>
                                                       {(this.props.gettravelinfobyid.stateId?this.props.cities:[]).map(obj=>
                                                      <option value={obj.cityId}>{obj.cityName}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                                          </div>
                                       
                
                                       <div class="row" style={{margin:"auto",textAlign:"center"/* marg:auto;text-align: center} */}}>
                                            <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                                            <button type="reset" class="btn btn-light">Cancel</button>
                                        </div>
    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">List<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                    <div class="table-responsive"></div>
                                      <ReactTable columns={[
                                   
                                  {
                                    Header: "Name",
                                    accessor: "vehicleName",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Owner",
                                    accessor: "vehicleOwner",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Contact Number",
                                    accessor: "vehicleContactNumber",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Agency Name",
                                    accessor: "agencyName",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "City",
                                    accessor: "cityId",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
                                    accessor: d => d.travelInfoId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                      </div>)

                                  }

                                ]}
                                data={this.props.gettravelinfo}
                                showPagination={true}
                                defaultPageSize={5}
                               
                         /> 
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
          gettravelinfobyid:state.goAdvStore.gettravelinfobyid,
          countries:state.goAdvStore.countries,
          states:state.goAdvStore.states,
          gettraveltype:state.goAdvStore.gettraveltype,
          gettravelinfo:state.goAdvStore.gettravelinfo,
          message: state.goAdvStore.message,
          messageData: state.goAdvStore.messageData,
          cities:state.goAdvStore.cities
         
        }
      }
      export default connect(mapStateToProps, { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord})(TravelInfo);
    
    
    //export default TravelInfo

