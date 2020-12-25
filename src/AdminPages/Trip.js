import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import { loadData, gettripbyid, GET_TRIP, GET_TRIP_BYID, GET_TRIP_BYPACKAGEID, POST_TRIP, PUT_TRIP, GET_ALL_PACKAGES, GET_STAYTYPE, GET_TRAVELTYPE,DELETE_TRIP } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'

import { Multiselect } from 'multiselect-react-dropdown';
import { gettingMultiselectValues } from '../Shared/ReauasbleFunctions'

import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'




var condition = false;


class Trip extends Component {
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
            url = GET_TRIP_BYPACKAGEID + valuefromurl;
            this.props.getData(action.GET_TRIP_BYPACKAGEID, url)
        }
        else {
            this.props.getData(action.GET_TRIP, GET_TRIP)
        }

        this.props.getData(action.GET_ALL_PACKAGES, GET_ALL_PACKAGES)
        this.props.getData(action.GET_TRAVELTYPE, GET_TRAVELTYPE)
        this.props.getData(action.GET_STAYTYPE, GET_STAYTYPE)
    }
    componentWillMount() {
        this.props.removeErrormsg()
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
            startDate: this.props.gettripbyid.startDate,
            endDate: this.props.gettripbyid.endDate,
            treckLeaderId: parseInt(this.props.gettripbyid.treckLeaderId),
            strengthLimit: parseInt(this.props.gettripbyid.strengthLimit),
            travelTypeIds: this.props.gettripbyid.travelTypeIds ? this.props.gettripbyid.travelTypeIds : "",
            basePrice: parseInt(this.props.gettripbyid.basePrice),
            maxPrice: parseInt(this.props.gettripbyid.maxPrice),
            stayTypeIds: this.props.gettripbyid.stayTypeIds ? this.props.gettripbyid.stayTypeIds : "",
            couponCode: this.props.gettripbyid.couponCode,
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
    tripbypackageOperation(id) {
        this.props.getData(action.GET_TRIP_BYPACKAGEID, GET_TRIP_BYPACKAGEID + id)
    }

    handleReset() {
        this.props.resetData(action.RESET_DATA, "gettripbyid");
        this.setState({ validated: false });
    }
    editReacord(id) {
        this.props.getData(action.GET_TRAVELTYPE, GET_TRAVELTYPE)
        this.props.getData(action.GET_STAYTYPE, GET_STAYTYPE);
        this.props.getData(action.GET_TRIP_BYID, GET_TRIP_BYID + id)
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
                                {this.props.message ?
                                    <div className={`message-wrapper ${this.props.messageData.isSuccess ? "success" : "error"}`}>{this.props.messageData.message}</div> :
                                    null
                                }
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
                                        <div class="card-body">
                                            <h4 class="card-title">Trip</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Name</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.gettripbyid.tripName ? this.props.gettripbyid.tripName : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "tripName")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Package</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.gettripbyid.packageId ? this.props.gettripbyid.packageId : "0"} onChange={(e) => this.updateTrip(e,"packageId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.packages.map(obj =>
                                                                        <option value={obj.packageId}>{obj.packageName}</option>
                                                                    )}
                                                                </select>
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
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">StartDate</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.gettripbyid.startDate ? this.props.gettripbyid.startDate : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "startDate")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">EndDate</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.gettripbyid.endDate ? this.props.gettripbyid.endDate : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "endDate")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">TreckLeader Id</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripbyid.treckLeaderId ? this.props.gettripbyid.treckLeaderId : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "treckLeaderId")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Strength Limit</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripbyid.strengthLimit ? this.props.gettripbyid.strengthLimit : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "strengthLimit")} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">TravelType Ids</label>
                                                            <div class="col-sm-9">
                                                                <Multiselect selectedValues={this.props.traveltypeids} options={this.props.gettraveltype} displayValue={"travelTypeName"}
                                                                    onSelect={(e) => this.updateTrip(e, "travelTypeIds")} onRemove={(e) => this.updateTrip(e, "travelTypeIds")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">BasePrice</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripbyid.basePrice ? this.props.gettripbyid.basePrice : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "basePrice")} />
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
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">MaxPrice</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.gettripbyid.maxPrice ? this.props.gettripbyid.maxPrice : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "maxPrice")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">CouponCode</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.gettripbyid.couponCode ? this.props.gettripbyid.couponCode : ""}
                                                                    class="form-control" onChange={(e) => this.updateTrip(e, "couponCode")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">StayTypeIds</label>
                                                            <div class="col-sm-9">
                                                                <Multiselect selectedValues={this.props.staytypeids} options={this.props.getstaytype}
                                                                    displayValue={"stayTypeName"} onSelect={(e) => this.updateTrip(e,"stayTypeIds")} onRemove={(e) => this.updateTrip(e,"stayTypeIds")} />
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

                                            </Form>
                                        </div>
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
                                                        <select class="form-control travellerMode" onChange={(e) => this.tripbypackageOperation(e.target.value)}>
                                                            <option value={0}>Select</option>
                                                            {this.props.packages.map(obj =>
                                                                <option value={obj.packageId}>{obj.packageName}</option>
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
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: '',
                                                    accessor: d => d.tripId,
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
                                                data={this.props.gettrip}
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
        gettrip: state.goAdvStore.gettrip,
        gettripbyid: state.goAdvStore.gettripbyid,
        packages: state.goAdvStore.packages,
        gettraveltype: state.goAdvStore.gettraveltype,
        getstaytype: state.goAdvStore.getstaytype,
        staytypeids: state.goAdvStore.staytypeids,
        traveltypeids: state.goAdvStore.traveltypeids,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord })(Trip);
    //export default Trip

