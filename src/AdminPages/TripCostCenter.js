import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import { GET_TRIP_COSTCENTER,GET_TRAVELTYPE,GET_STAYTYPE ,GET_TRIP_COSTCENTERBYID,GET_USER_BYID,GET_ITENARY,GET_TRIP_COSTCENTER_BYTRIPID, POST_TRIP_COSTCENTER, PUT_TRIP_COSTCENTER, GET_COSTCENTRE, GET_TRIP, DELETE_TRIP_COSTCENTER,GET_STAYTYPE_BYTRIPID,GET_TRAVELTYPE_BYID, GET_TRAVELTYPE_BYTRIPID, GET_ALL_PACKAGES, GET_TRIP_BYPACKAGEID } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData, resetData,removedata,removeErrormsg,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'




var condition = false;

var valuefromurl
class TripCostCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            refreshflag: false,
            hidestaytype:"true",
            hidetraveltype:"true"
        }

    }
    componentDidMount() {
        debugger
        var url

        if (this.props.match.params.tid !== undefined) {
             valuefromurl = parseInt(this.props.match.params.tid);
            url = GET_TRIP_COSTCENTER_BYTRIPID + valuefromurl;
            this.props.getData(action.GET_TRIP_COSTCENTER_BYTRIPID, GET_TRIP_COSTCENTER_BYTRIPID + valuefromurl)
        }
        else {
            this.props.getData(action.GET_TRIP_COSTCENTER, GET_TRIP_COSTCENTER)
        }

        this.props.getData(action.GET_ALL_PACKAGES,GET_ALL_PACKAGES)
        this.props.getData(action.GET_COSTCENTRE, GET_COSTCENTRE)
        this.props.getData(action.GET_TRIP, GET_TRIP)
        this.props.getData(action.GET_ITENARY,GET_ITENARY)
        this.props.getData(action.GET_TRAVELTYPE,GET_TRAVELTYPE)
        this.props.getData(action.GET_STAYTYPE,GET_STAYTYPE)
        this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))
        
    }
    componentWillMount() {
        this.props.removeErrormsg()
        this.props.removedata("gettripcostcenterbyid")
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_TRIP_COSTCENTER,DELETE_TRIP_COSTCENTER+id)
    }

    postTripdata() {
        debugger
        const obj = {
            tripCostcenterId: this.props.gettripcostcenterbyid.tripCostcenterId? this.props.gettripcostcenterbyid.tripCostcenterId: 0,
            tripId: parseInt(this.props.gettripcostcenterbyid.tripId),
            //itenaryId: parseInt(this.props.gettripcostcenterbyid.itenaryId),
            price: parseInt(this.props.gettripcostcenterbyid.price),
            travelTypeId:parseInt(this.props.gettripcostcenterbyid.travelTypeId?this.props.gettripcostcenterbyid.travelTypeId:0),
            stayTypeId:parseInt(this.props.gettripcostcenterbyid.stayTypeId?this.props.gettripcostcenterbyid.stayTypeId:0),
            type:this.props.gettripcostcenterbyid.type,
            createdBy:this.props.gettripcostcenterbyid.tripCostcenterId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName,
          modifiedBy:this.props.gettripcostcenterbyid.tripCostcenterId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null,
            isDeleted:this.props.gettripcostcenterbyid.tripCostcenterId? false : true

        };
        let url = PUT_TRIP_COSTCENTER + this.props.gettripcostcenterbyid.tripCostcenterId;
        if (this.props.gettripcostcenterbyid.tripCostcenterId) {
            this.props.putData1(action.PUT_TRIP_COSTCENTER, url, obj);
        }
        else {
            this.props.postData1(action.POST_TRIP_COSTCENTER, POST_TRIP_COSTCENTER, obj);
        }
        this.setState({ validated: false });
    }

    handleSubmit(event) {
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
            this.postTripdata();
        }
    }
    tripcostcenterbytripOperation(id) {
        valuefromurl=parseInt(id)
        this.props.getData(action.GET_TRIP_COSTCENTER_BYTRIPID, GET_TRIP_COSTCENTER_BYTRIPID + id)
    }

    handleReset() {
        this.props.resetData(action.RESET_DATA, "gettripcostcenterbyid");
        this.setState({ validated: false });
    }
    refresh(e)
    {
       if(valuefromurl)
       {
        valuefromurl=valuefromurl
        this.props.getData(action.GET_TRIP_COSTCENTER_BYTRIPID,GET_TRIP_COSTCENTER_BYTRIPID+valuefromurl)
       }
       else
       {
           valuefromurl="0"
        this.props.getData(action.GET_TRIP_COSTCENTER, GET_TRIP_COSTCENTER)
       }
        
    }
    editReacord(id) {
        debugger
        this.props.getData(action.GET_TRIP_COSTCENTERBYID, GET_TRIP_COSTCENTERBYID + id)
        
    }
    updateTrip = (e, paramName) => 
    {
        var value=e.target.value
        if(e.target.value === "Stay")
        {
           /*  this.setState({
                hidestaytype:"",
                hidetraveltype:"true"
            })  */
            this.props.updatePropAccData("hidetraveltype","true", "gettripcostcenterbyid");
            this.props.updatePropAccData("hidestaytype","", "gettripcostcenterbyid");
            //this.props.updatePropAccData("type",e.target.value, "gettripcostcenterbyid");
        }
        else if(e.target.value === "Travel")
        {
            /* this.setState({
                hidestaytype:"true",
                hidetraveltype:""
            })   */            
            this.props.updatePropAccData("hidetraveltype","", "gettripcostcenterbyid");
            this.props.updatePropAccData('hidestaytype',"true", "gettripcostcenterbyid");
            //this.props.updatePropAccData("type",e.target.value, "gettripcostcenterbyid");
        }
        else if(paramName === "tripId")
        {
          this.props.getData(action.GET_STAYTYPE_BYTRIPID,GET_STAYTYPE_BYTRIPID+e.target.value)
          this.props.getData(action.GET_TRAVELTYPE_BYTRIPID,GET_TRAVELTYPE_BYTRIPID+e.target.value)
          
        }
        else if(paramName === "packageId")
        {
            this.props.getData(action.GET_TRIP_BYPACKAGEID,GET_TRIP_BYPACKAGEID+e.target.value)
            value = e.target.value
        }
        this.props.updatePropAccData(paramName, value, "gettripcostcenterbyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    render() {
       /*  debugger
        if(this.props.gettripcostcenterbyid)
        {
            
        if(this.props.gettripcostcenterbyid.type==="staytype")
        {
            this.setState({
                hidestaytype:"",
                hidetraveltype:"true"
            }) 
        }
        else if(this.props.gettripcostcenterbyid.type === "traveltype")
        {
            this.setState({
                hidestaytype:"true",
                hidetraveltype:""
            })  
        } 
    }
 */        return (
            <div>
                

                <div class="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
                    <Sidebar />

                    <div class="main-panel">
                        <div class="content-wrapper">

                            <div class="page-header">
                                <h3 class="page-title">
                                    <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                        <i class="mdi mdi-wan"></i>
                                    </span> Trip Cost Center
                        </h3>
                       

                                <nav aria-label="breadcrumb">
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">
                                            Trip Cost Center
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Trip Cost Center</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Package</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripcostcenterbyid.packageId? this.props.gettripcostcenterbyid.packageId : "0"} 
                                                                onChange={(e) => this.updateTrip(e,"packageId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.packages.map(obj =>
                                                                        <option value={obj.packageId}>{obj.packageName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Trip</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripcostcenterbyid.tripId? this.props.gettripcostcenterbyid.tripId : "0"} 
                                                                onChange={(e) => this.updateTrip(e,"tripId")}>
                                                                    <option value={0}>Select</option>
                                                                    {(this.props.gettripcostcenterbyid.packageId?this.props.gettrip:[]).map(obj =>
                                                                        <option value={obj.tripId}>{obj.tripName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Type</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripcostcenterbyid.type?this.props.gettripcostcenterbyid.type :"0"} onChange={(e) => this.updateTrip(e,"type")}>
                                                                    <option value={0}>Select</option>
                                                                   <option value="Stay">StayType</option>
                                                                   <option value="Travel">TravelType</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6"  hidden={this.props.gettripcostcenterbyid.hidetraveltype === ""?this.props.gettripcostcenterbyid.hidetraveltype:"true"}>
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Travel Type</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripcostcenterbyid.travelTypeId?this.props.gettripcostcenterbyid.travelTypeId:"0"} onChange={(e) => this.updateTrip(e,"travelTypeId")}>
                                                                    <option value={0}>Select</option>
                                                                    {(this.props.gettripcostcenterbyid.tripId?this.props.gettraveltype:[]).map(obj =>
                                                                        <option value={obj.travelTypeId}>{obj.travelTypeName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6"  hidden={this.props.gettripcostcenterbyid.hidestaytype === ""?this.props.gettripcostcenterbyid.hidestaytype:"true"}>
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Staytype</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripcostcenterbyid.stayTypeId?this.props.gettripcostcenterbyid.stayTypeId:"0"} onChange={(e) => this.updateTrip(e,"stayTypeId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.getstaytype.map(obj =>
                                                                        <option value={obj.stayTypeId}>{obj.stayTypeName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                  {/*   <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Itenary</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripcostcenterbyid.itenaryId?this.props.gettripcostcenterbyid.itenaryId:"0"} onChange={(e) => this.updateTrip(e,"itenaryId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.getitenary.map(obj =>
                                                                        <option value={obj.itenaryId}>{obj.summary}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Price</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripcostcenterbyid.price ? this.props.gettripcostcenterbyid.price : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "price")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>    
                                                
                                                   
                                           

                                                <div class="row" style={{ margin: "auto", textAlign: "center"/* marg:auto;text-align: center} */ }}>
                                                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                                                    <button type="reset" class="btn btn-light">Cancel</button>
                                                </div>
                                                <br/>
                                                <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>

                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Trip Cost Center<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Trip</label>
                                                    <div class="col-sm-9">
                                                        <select class="form-control travellerMode" value={valuefromurl?valuefromurl:"0"} onChange={(e) => this.tripcostcenterbytripOperation(e.target.value)}>
                                                            <option value={0}>Select</option>
                                                            {this.props.gettrip.map(obj =>
                                                                <option value={obj.tripId}>{obj.tripName}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[

                                                {
                                                    Header: "Trip Name",
                                                    accessor: "tripName",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                 {
                                                    Header: "Stay or Travel",
                                                    accessor: "type",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Stay or Travel Name",
                                                    accessor: "stayOrTravelTypeName",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Price",
                                                    accessor: "price",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: '',
                                                    accessor: d => d.tripCostcenterId,
                                                    maxWidth: 300,
                                                    Cell: row => (
                                                        <div className="template-demo">
                                                            <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                <i class="mdi mdi-pencil-outline"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                                <i class="mdi mdi-delete-outline"></i>
                                                            </button>
                                                        </div>)
                                                }
                                            ]}
                                                data={this.props.gettripcostcenter}
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
        gettripcostcenter: state.goAdvStore.gettripcostcenter,
        gettripcostcenterbyid: state.goAdvStore.gettripcostcenterbyid,
        gettrip: state.goAdvStore.gettrip,
        getcostcenter: state.goAdvStore.getcostcenter,
        getallcostcentres:state.goAdvStore.getallcostcentres,
        getitenary:state.goAdvStore.getitenary,
        gettraveltype:state.goAdvStore.gettraveltype,
        getstaytype:state.goAdvStore.getstaytype,
        packages:state.goAdvStore.packages,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData,
        getuserbyidprofile:state.goAdvStore.getuserbyidprofile
    }
}
export default connect(mapStateToProps, {getData,postData1,removedata,putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord })(TripCostCenter);
    //export default Trip

