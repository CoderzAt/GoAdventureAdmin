import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import { loadData, gettripbyid, GET_TRIP,GET_TRECKLEADERS, GET_TRIP_BYID, GET_USER_BYID,GET_TRIP_BYPACKAGEID,GET_STATUS_BYTYPE,POST_TRIP, PUT_TRIP, GET_ALL_PACKAGES, GET_STAYTYPE, GET_TRAVELTYPE,DELETE_TRIP } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Link} from "react-router-dom";
import Sidebar from './Sidebar'
import dateFormat from 'dateformat';
import { Multiselect } from 'multiselect-react-dropdown';
import { gettingMultiselectValues } from '../Shared/ReauasbleFunctions'

import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData,removedata,resetData, removeErrormsg,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'
import * as validation from "../Shared/Validations";
import Spinner1 from '../Components/Spinner1';

var condition = false;
var valuefromurl
var errors={}
class Trip extends Component {
    constructor(props) {
        super(props);
        
        this.multiselectRef = React.createRef();
        this.multiselectRefTravel = React.createRef();
        
        this.state = {
            validated: false,
            refreshflag: false,
            hide: "true",
            errors:{
                selectpackageid:"",
                selecttreckleader:"",
                selectstaytypeids:"",
                selecttraveltypeids:"",
            }
        }
    }
    componentDidMount() {
        debugger
        var url

        if (this.props.match.params.tid != undefined) {
             valuefromurl = parseInt(this.props.match.params.tid);
            url = GET_TRIP_BYPACKAGEID + valuefromurl;
            this.props.getData(action.GET_TRIP_BYPACKAGEID, url)
        }
        else {
            this.props.getData(action.GET_TRIP, GET_TRIP)
        }

        this.props.getData(action.GET_ALL_PACKAGES, GET_ALL_PACKAGES)
        this.props.getData(action.GET_TRAVELTYPE, GET_TRAVELTYPE)
        this.props.getData(action.GET_STAYTYPE, GET_STAYTYPE)
        this.props.getData(action.GET_TRECKLEADERS,GET_TRECKLEADERS)
        this.props.getData(action.GET_STATUS_BYTYPE,GET_STATUS_BYTYPE+"Trip")
        this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))
    }
    componentWillMount() {
        this.props.removeErrormsg()
        this.props.removedata("gettripbyid")
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_TRIP,DELETE_TRIP+id)
    }

    postTripdata() {
        debugger
        const obj = {
            tripId: this.props.gettripbyid.tripId ? this.props.gettripbyid.tripId : 0,
            tripName: this.props.gettripbyid.tripName,
            packageId: parseInt(this.props.gettripbyid.packageId),
            startDate: dateFormat(this.props.gettripbyid.startDate,"yyyy-mm-dd"),
            endDate: dateFormat(this.props.gettripbyid.endDate,"yyyy-mm-dd"),
            treckLeaderId: parseInt(this.props.gettripbyid.treckLeaderId),
            strengthLimit: parseInt(this.props.gettripbyid.strengthLimit),
            travelTypeIds: this.props.gettripbyid.travelTypeIds ? this.props.gettripbyid.travelTypeIds : "",
            basePrice: parseInt(this.props.gettripbyid.basePrice),
            deposit: parseInt(this.props.gettripbyid.deposit),
            maxPrice: parseInt(this.props.gettripbyid.maxPrice),
            stayTypeIds: this.props.gettripbyid.stayTypeIds ? this.props.gettripbyid.stayTypeIds : "",
            couponCode: this.props.gettripbyid.couponCode || this.props.gettripbyid.couponCode !== ""?this.props.gettripbyid.couponCode:null,
            couponUserUsageCount: this.props.gettripbyid.couponUserUsageCount || this.props.gettripbyid.couponUserUsageCount ===""?this.props.gettripbyid.couponUserUsageCount*1:0,
            statusId:parseInt(this.props.gettripbyid.statusId?this.props.gettripbyid.statusId:0),
            createdBy:this.props.gettripbyid.tripId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName,
            modifiedBy:this.props.gettripbyid.tripId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null,
            couponExpiryDate: this.props.gettripbyid.couponExpiryDate?dateFormat(this.props.gettripbyid.couponExpiryDate,"yyyy-mm-dd"):null,
            isDeleted: this.props.gettripbyid.tripId ? false : true

        };
        let url = PUT_TRIP + this.props.gettripbyid.tripId;
        if (this.props.gettripbyid.tripId) {
            this.props.putData1(action.PUT_TRIP, url, obj);
        }
        else {
            this.props.postData1(action.POST_TRIP, POST_TRIP, obj);
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
          debugger
        let packageid = this.props.gettripbyid.packageId?this.props.gettripbyid.packageId:"0";
        let treckleaderid= this.props.gettripbyid.treckLeaderId?this.props.gettripbyid.treckLeaderId:"0";
        let staytypeids=this.props.gettripbyid.stayTypeIds !== undefined?this.props.gettripbyid.stayTypeIds:"0";
        let traveltypeids=this.props.gettripbyid.travelTypeIds !== undefined?this.props.gettripbyid.travelTypeIds:"0"

        let packageiderror = validation.selectvalidation(packageid);
        let treckleaderiderror=validation.selectvalidation(treckleaderid);
        let staytypeidserror=validation.multiselectvalidation(staytypeids);
        let traveltypeidserror=validation.multiselectvalidation(traveltypeids);
        
        this.setState({
            errors: {
            selectpackageid:packageiderror,
            selecttreckleader:treckleaderiderror,
            selectstaytypeids:staytypeidserror,
            selecttraveltypeids:traveltypeidserror
            }
        })
        errors.selectpackageid=packageiderror;
        errors.selecttreckleader=treckleaderiderror;
        errors.selectstaytypeids=staytypeidserror;
        errors.selecttraveltypeids=traveltypeidserror;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handlevalidations();
        const form = event.currentTarget;
        console.log("checkform", form.checkValidity());
        this.setState({ validated: true });
        if (form.checkValidity() === false || this.validateForm(errors) === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            debugger
            event.preventDefault();
            this.postTripdata();
            this.setState({ hide: "true"})
           /*  this.multiselectRef.current.resetSelectedValues()
            this.multiselectRefTravel.current.resetSelectedValues() */
        }
    }
    tripbypackageOperation(id) {
        valuefromurl=id;
        this.props.getData(action.GET_TRIP_BYPACKAGEID, GET_TRIP_BYPACKAGEID + id)
    }

    handleReset() {
        this.props.resetData(action.RESET_DATA, "gettripbyid");
        this.multiselectRef.current.resetSelectedValues();
        this.multiselectRefTravel.current.resetSelectedValues()
        this.setState({ validated: false, hide: "true" });
    }
    refresh()
    {
        if(valuefromurl && valuefromurl !== "0")
        {
         valuefromurl = valuefromurl
         this.props.getData(action.GET_TRIP_BYPACKAGEID,GET_TRIP_BYPACKAGEID+valuefromurl)
        }
        else{
            valuefromurl="0"
        this.props.getData(action.GET_TRIP,GET_TRIP)
        }
    }
    editReacord(id) {
        this.props.getData(action.GET_TRAVELTYPE, GET_TRAVELTYPE)
        this.props.getData(action.GET_STAYTYPE, GET_STAYTYPE);
        this.props.getData(action.GET_TRIP_BYID, GET_TRIP_BYID + id)
        window.scrollTo({
            top:100,
            behavior: 'smooth',
        })
        this.setState({ hide: ""})
    }
    replicateTrip(id) {
        debugger
        this.props.getData(action.GET_TRAVELTYPE, GET_TRAVELTYPE)
        this.props.getData(action.GET_STAYTYPE, GET_STAYTYPE);
        this.props.getData(action.REPLICATE_TRIP_BYID, GET_TRIP_BYID + id)
       
        window.scrollTo({
            top:100,
            behavior: 'smooth',
        })
        //this.props.updatePropAccData("tripId",undefined,"gettripbyid");
        this.setState({ hide: ""})
    }
    updateTrip = (e, paramName) => {
        let value
        if (paramName === "travelTypeIds") {
            value = Array.prototype.map.call(e, function (item) { return item.travelTypeId; }).join(",");
        }
        else if (paramName === "stayTypeIds") {
            value = Array.prototype.map.call(e, function (item) { return item.stayTypeId; }).join(",")
        }
        else {
            value = e.target.value
        }
        this.props.updatePropAccData(paramName, value, "gettripbyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    render() {
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
                                    </span> Trip
                        </h3>
                        
                                <nav aria-label="breadcrumb">
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">
                                            Trip
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                    <div class="col-12 text-right"><span class="text-danger">*</span> <small class="very-small"> Fields Are Mandatory</small></div>
                                        <div class="card-body">
                                            <h4 class="card-title">Trip</h4>
                                            
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Package<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripbyid.packageId ? this.props.gettripbyid.packageId : "0"} onChange={(e) => this.updateTrip(e,"packageId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.packages.map(obj =>
                                                                        <option value={obj.packageId}>{obj.displayName}</option>
                                                                    )}
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectpackageid}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Name<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.gettripbyid.tripName ? this.props.gettripbyid.tripName : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "tripName")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                    {/* <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Package</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.state.editData.packageId} class="form-control" onChange={(e)=>this.packageOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div> */}
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Start Date<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="date" value={this.props.gettripbyid.startDate ? this.props.gettripbyid.startDate : "" }
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "startDate")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">End Date<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="date" value={this.props.gettripbyid.endDate ? this.props.gettripbyid.endDate : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "endDate")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Treck Leader<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <select  value={this.props.gettripbyid.treckLeaderId ? this.props.gettripbyid.treckLeaderId : "0" }
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "treckLeaderId")} >
                                                                        <option value={0}>Select</option>
                                                                        {this.props.gettreckleaders.map(obj=>(
                                                                            <option value={obj.userId}>{`${obj.firstName} ${obj.lastName}`}</option>
                                                                        ))}
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selecttreckleader}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Strength Limit<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripbyid.strengthLimit ? this.props.gettripbyid.strengthLimit : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "strengthLimit")} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Travel Types<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <Multiselect selectedValues={this.props.traveltypeids} options={this.props.gettraveltype} displayValue={"travelTypeName"}
                                                                    onSelect={(e) => this.updateTrip(e, "travelTypeIds")} onRemove={(e) => this.updateTrip(e, "travelTypeIds")} ref={this.multiselectRefTravel} />
                                                             <small style={{ color: "red" }}>
                                                                    {this.state.errors.selecttraveltypeids}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Stay Types<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <Multiselect selectedValues={this.props.staytypeids} options={this.props.getstaytype}
                                                                    displayValue={"stayTypeName"} onSelect={(e) => this.updateTrip(e,"stayTypeIds")} onRemove={(e) => this.updateTrip(e,"stayTypeIds")} ref={this.multiselectRef} />
                                                           <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectstaytypeids}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Base Price<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripbyid.basePrice ? this.props.gettripbyid.basePrice : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "basePrice")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Deposit (Per Person)<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripbyid.deposit ? this.props.gettripbyid.deposit : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "deposit")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*  <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">DiscountPrice</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number"   class="form-control"  onChange={(e)=>this.discountpriceOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div> */}
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Max Price<span class="text-danger">*</span></label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripbyid.maxPrice ? this.props.gettripbyid.maxPrice : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "maxPrice")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Coupon Code</label>
                                                            <div class="col-sm-9">
                                                                <input  type="text" value={this.props.gettripbyid.couponCode ? this.props.gettripbyid.couponCode : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "couponCode")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Coupon Capacity</label>
                                                            <div class="col-sm-9">
                                                                <input  type="number" value={this.props.gettripbyid.couponUserUsageCount ? this.props.gettripbyid.couponUserUsageCount : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "couponUserUsageCount")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Coupon Expiry Date</label>
                                                            <div class="col-sm-9">
                                                                <input  type="date" value={this.props.gettripbyid.couponExpiryDate ? this.props.gettripbyid.couponExpiryDate : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "couponExpiryDate")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6" hidden={this.state.hide }>
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Status</label>
                                                            <div class="col-sm-9">
                                                                <select  value={this.props.gettripbyid.statusId ? this.props.gettripbyid.statusId : "0" }
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "statusId")} >
                                                                        <option value={0}>Select</option>
                                                                        {this.props.getstatusbytype.map(obj=>(
                                                                            <option value={obj.statusId}>{`${obj.statusCode}`}</option>
                                                                        ))}
                                                                        </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">City</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.cityIdOperation(e)}>
                                                       {this.state.cities.map(obj=>
                                                      <option value={obj.cityId}>{obj.cityName}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div> */}
                                                    {/* <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">CityId</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number"   class="form-control"  onChange={(e)=>this.cityIdOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
 */}                                        </div>

                                                <div class="row" style={{ margin: "auto", textAlign: "center"/* marg:auto;text-align: center} */ }}>
                                                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                                                    <button type="reset" class="btn btn-light">Cancel</button>
                                                </div>
                                                <br/>
                                                {this.props.isputTripLoading || this.props.ispostTripLoading?
                                            <Spinner1/>:
                                                <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>}

                                            </Form>                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Trips<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Package</label>
                                                    <div class="col-sm-9">
                                                        <select class="form-control travellerMode" value={valuefromurl?valuefromurl:"0"} onChange={(e) => this.tripbypackageOperation(e.target.value)}>
                                                            <option value={0}>Select</option>
                                                            {this.props.packages.map(obj =>
                                                                <option value={obj.packageId}>{obj.displayName}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[

                                                {
                                                    Header: "Name",
                                                    accessor: "tripName",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Base Price",
                                                    accessor: "basePrice",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Start Date",
                                                    accessor: "startDate",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "End Date",
                                                    accessor: "endDate",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Package Name",
                                                    accessor: "packageId",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "StrengthLimit",
                                                    accessor: "strengthLimit",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Bookings",
                                                    accessor: "confirmedBookings",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }
                                                },
                                                {
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: '',
                                                    accessor: d => d.tripId,
                                                    maxWidth: 500,
                                                    Cell: row => (
                                                        <div className="template-demo">
                                                            <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                <i class="mdi mdi-pencil-outline"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                                <i class="mdi mdi-delete-outline"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-icon" value={row.value} >
                                                                <Link to={`/admin/tripcostcenter/${row.value}`}>Costcentre </Link>
                                                            </button>
                                                           <br/>
                                                            <button type="button" value={row.value} class="btn btn-icon">
                                                                <Link to={`/admin/booking/${row.value}`}>Bookings</Link>
                                                            </button>
                                                            <br/>
                                                            <button type="button" value={row.value} onClick={(e) => { this.replicateTrip(row.value) }} class="btn btn-icon">
                                                                <b>Replicate</b>
                                                            </button>
                                                        </div>)
                                                }
                                            ]}
                                                data={this.props.gettrip}
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
        )
    }
}
const mapStateToProps = (state) => {
    return {
        gettrip: state.goAdvStore.gettrip,
        gettripbyid: state.goAdvStore.gettripbyid,
        packages: state.goAdvStore.packages,
        gettraveltype: state.goAdvStore.gettraveltype,
        getstaytype: state.goAdvStore.getstaytype,
        staytypeids: state.goAdvStore.staytypeids,
        traveltypeids: state.goAdvStore.traveltypeids,
        gettreckleaders:state.goAdvStore.gettreckleaders,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData,
        getuserbyidprofile:state.goAdvStore.getuserbyidprofile,
        getstatusbytype:state.goAdvStore.getstatusbytype,
        ispostTripLoading:state.goAdvStore.ispostTripLoading,
        isputTripLoading:state.goAdvStore.isputTripLoading
    }
}
export default connect(mapStateToProps, { getData,postData1,removedata,putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord })(Trip);
    //export default Trip
