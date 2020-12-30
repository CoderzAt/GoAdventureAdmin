import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import { GET_TRIP_COSTCENTER, GET_TRIP_COSTCENTERBYID, GET_TRIP_COSTCENTER_BYTRIPID, POST_TRIP_COSTCENTER, PUT_TRIP_COSTCENTER, GET_COSTCENTRE, GET_TRIP, DELETE_TRIP_COSTCENTER } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'




var condition = false;


class TripCostCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            refreshflag: false
        }

    }
    componentDidMount() {
        debugger
        var url

        if (this.props.match.params.tid != undefined) {
            let valuefromurl = parseInt(this.props.match.params.tid);
            url = GET_TRIP_COSTCENTER_BYTRIPID + valuefromurl;
            this.props.getData(action.GET_TRIP_COSTCENTER_BYTRIPID, url)
        }
        else {
            this.props.getData(action.GET_TRIP_COSTCENTER, GET_TRIP_COSTCENTER)
        }

        this.props.getData(action.GET_COSTCENTRE, GET_COSTCENTRE)
        this.props.getData(action.GET_TRIP, GET_TRIP)
        
    }
    componentWillMount() {
        this.props.removeErrormsg()
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_TRIP_COSTCENTER,DELETE_TRIP_COSTCENTER+id)
    }

    postTripdata() {
        debugger
        const obj = {
            tripCostcenterID: this.props.gettripcostcenterbyid.tripCostcenterID ? this.props.gettripcostcenterbyid.tripCostcenterID : 0,
            costCenterID: parseInt(this.props.gettripcostcenterbyid.costCenterID),
            tripID: parseInt(this.props.gettripcostcenterbyid.tripID),
            itenaryID: parseInt(this.props.gettripcostcenterbyid.itenaryID),
            price: parseInt(this.props.gettripcostcenterbyid.price),
            isDeleted: this.props.gettripcostcenterbyid.tripId ? false : true

        };
        let url = PUT_TRIP_COSTCENTER + this.props.gettripcostcenterbyid.tripCostcenterID;
        if (this.props.gettripcostcenterbyid.tripCostcenterID) {
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
        this.props.getData(action.GET_TRIP_COSTCENTER_BYTRIPID, GET_TRIP_COSTCENTER_BYTRIPID + id)
    }

    handleReset() {
        this.props.resetData(action.RESET_DATA, "gettripcostcenterbyid");
        this.setState({ validated: false });
    }
    editReacord(id) {
        this.props.getData(action.GET_COSTCENTRE, GET_COSTCENTRE)
        this.props.getData(action.GET_TRIP, GET_TRIP);
        this.props.getData(action.GET_TRIP_COSTCENTERBYID, GET_TRIP_COSTCENTERBYID + id)
    }
    updateTrip = (e, paramName) => {
        let value
       /* if (paramName === "travelTypeIds") {
            value = Array.prototype.map.call(e, function (item) { return item.travelTypeId; }).join(",");
        }
        else if (paramName === "stayTypeIds") {
            value = Array.prototype.map.call(e, function (item) { return item.stayTypeId; }).join(",")
        }
        else {*/
            value = e.target.value
       /* }*/
        this.props.updatePropAccData(paramName, value, "gettripcostcenterbyid");
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
                                    </span> Trip Cost Center
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
                                                            <label class="col-sm-3 col-form-label">Trip</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripcostcenterbyid.tripID ? this.props.gettripcostcenterbyid.tripID : "0"} onChange={(e) => this.updateTrip(e,"tripID")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.gettrip.map(obj =>
                                                                        <option value={obj.tripId}>{obj.tripName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Cost Center</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripcostcenterbyid.costCenterID ? this.props.gettripcostcenterbyid.costCenterID : "0"} onChange={(e) => this.updateTrip(e,"costCenterID")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.getallcostcentres.map(obj =>
                                                                        <option value={obj.costCenterId}>{obj.costCenterName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>    
                                                <div class="row">
                                                    
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
                                                        <select class="form-control travellerMode" onChange={(e) => this.tripcostcenterbytripOperation(e.target.value)}>
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
                                                    Header: "Cost Center Name",
                                                    accessor: "costCenterId",
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
        gettripcostcenter: state.goAdvStore.gettripcostcenter,
        gettripcostcenterbyid: state.goAdvStore.gettripcostcenterbyid,
        gettrip: state.goAdvStore.gettrip,
        getcostcenter: state.goAdvStore.getcostcenter,
        getallcostcentres:state.goAdvStore.getallcostcentres,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord })(TripCostCenter);
    //export default Trip

