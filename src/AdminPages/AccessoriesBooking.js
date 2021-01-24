import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import { GET_ACCESSORIES_BOOKING, GET_USER,GET_ACCESSORIES_BOOKING_BYID, GET_ACCESSORIES_BOOKING_BYBOOKINGID, POST_ACCESSORIES_BOOKING, PUT_ACCESSORIES_BOOKING,  DELETE_ACCESSORIES_BOOKING,GET_ACCESSORIES_BOOKING_BYACCESSORYID,GET_ALL_ACCESSORIES,ACCESSARY_TYPE, GET_ACCESSORIES_BYID, GET_ACCESSORY_BYTYPE, GET_STATUS_BYTYPE} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'
import { Link} from "react-router-dom";




var condition = false;

var valuefromurl
class AccessoriesBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            refreshflag: false,
            accessaryid:"0"
        }

    }
    componentDidMount() 
    {
        debugger
        var url

        if (this.props.match.params.id !== undefined) {
             valuefromurl = parseInt(this.props.match.params.id);
            url = GET_ACCESSORIES_BOOKING_BYBOOKINGID + valuefromurl;
            this.props.getData(action.GET_ACCESSORIES_BOOKING_BYBOOKINGID, GET_ACCESSORIES_BOOKING_BYBOOKINGID + valuefromurl)
        }
        else {
            this.props.getData(action.GET_ACCESSORIES_BOOKING, GET_ACCESSORIES_BOOKING)
        }

        //this.props.getData(action.GET_ALL_ACCESSORIES, GET_ALL_ACCESSORIES)
        this.props.getData(action.GET_USER,GET_USER)
        this.props.getData(action.ACCESSARY_TYPE,ACCESSARY_TYPE)
        this.props.getData(action.GET_STATUS_BYTYPE,GET_STATUS_BYTYPE+"accessorybooking")
    }
    componentWillMount() {
        this.props.removeErrormsg()
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_ACCESSORIES_BOOKING,DELETE_ACCESSORIES_BOOKING+id)
    }

    postTripdata() {
        debugger
        const obj = {
            accessoryBookingId: this.props.accessorybookingbyid.accessoryBookingId? this.props.accessorybookingbyid.accessoryBookingId: 0,
            accessoryId: parseInt(this.props.accessorybookingbyid.accessoryId),
            isRent: JSON.parse(this.props.accessorybookingbyid.isRent),
            userId:parseInt(this.props.accessorybookingbyid.userId),
            userName: this.props.accessorybookingbyid.userName,
            phoneNumber: this.props.accessorybookingbyid.phoneNumber,
            emailId:this.props.accessorybookingbyid.emailId,
            givenDate: dateFormat(this.props.accessorybookingbyid.givenDate,"yyyy-mm-dd"),
            returnedDate:dateFormat(this.props.accessorybookingbyid.returnedDate,"yyyy-mm-dd"),
            price: parseInt(this.props.accessorybookingbyid.price),
            isDeleted:this.props.accessorybookingbyid.accessoryBookingId? false : true

        };
        let url = PUT_ACCESSORIES_BOOKING + this.props.accessorybookingbyid.accessoryBookingId;
        if (this.props.accessorybookingbyid.accessoryBookingId) {
            this.props.putData1(action.PUT_ACCESSORIES_BOOKING, url, obj);
        }
        else {
            this.props.postData1(action.POST_ACCESSORIES_BOOKING, POST_ACCESSORIES_BOOKING, obj);
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
    accessorybookingbyaccessoryOperation(id) {
        this.props.getData(action.GET_ACCESSORIES_BOOKING_BYACCESSORYID, GET_ACCESSORIES_BOOKING_BYACCESSORYID + id)
    }

    handleReset() {
        this.props.resetData(action.RESET_DATA, "accessorybookingbyid");
        this.setState({ validated: false });
    }
    refresh()
    {
        this.props.getData(action.GET_ACCESSORIES_BOOKING,GET_ACCESSORIES_BOOKING)
    }
   async editReacord(id) {
        await this.props.getData(action.GET_ALL_ACCESSORIES, GET_ALL_ACCESSORIES)
        debugger
        this.props.getData(action.GET_ACCESSORIES_BOOKING_BYID, GET_ACCESSORIES_BOOKING_BYID + id)
    }
    updateBooking = (e, paramName) => {
        let value
       /* if (paramName === "travelTypeIds") {
            value = Array.prototype.map.call(e, function (item) { return item.travelTypeId; }).join(",");
        }
        else if (paramName === "stayTypeIds") {
            value = Array.prototype.map.call(e, function (item) { return item.stayTypeId; }).join(",")
        }
        else {*/
           
       /* }*/
       if(paramName === "accessorytype")
       {
        value = e.target.value
        this.props.getData(action.GET_ACCESSORY_BYTYPE,GET_ACCESSORY_BYTYPE+value)
      
       }
       else
       {
        value = e.target.value
       }
        this.props.updatePropAccData(paramName, value, "accessorybookingbyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    getAcessarybyid(e)
    {
        debugger
     if(this.state.accessaryid !== "0" || this.state.accessaryid !== "")
     {
         this.props.getData(action.GET_ACCESSORIEBOOKING_BYID_ACCESSARYTABLE,GET_ACCESSORIES_BOOKING_BYID+this.state.accessaryid)
     }
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
                                    </span> Accessory Bookings
                        </h3>
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>
                                <nav aria-label="breadcrumb">
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">
                                        Accessory Bookings
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Accessory Booking</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                <div class="col-md-6">
                                                        <div class="form-group row">

                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Accessary Type</label>
                                                            <div class="col-sm-9">
                                                                <select required type="text" value={this.props.accessorybookingbyid.accessorytype?this.props.accessorybookingbyid.accessorytype:"0"}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "accessorytype")} >
                                                                      <option value={0}>Select</option>
                                                                       {this.props. getaccessarytype.map(obj=>(
                                                                            <option value={obj.id}>{obj.name}</option>
                                                                        ))}
                                                                        </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Accessary</label>

                                                            <div class="col-sm-9">
                                                                <select required type="text" value={this.props.accessorybookingbyid.accessoryId?this.props.accessorybookingbyid.accessoryId:"0"}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "accessoryId")} >
                                                                      <option value={0}>Select</option>
                                                                       {(this.props.accessorybookingbyid.accessorytype?this.props.accessories:[]).map(obj=>(
                                                                            <option value={obj.accessoriesId}>{obj.accessoryCode}</option>
                                                                        ))}
                                                                        </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Rent</label>
                                                            <div class="col-sm-9">
                                                                <select required type="text" value={this.props.accessorybookingbyid.isRent ? this.props.accessorybookingbyid.isRent : "0"}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "isRent")} >
                                                                        <option value={0}>Select</option>
                                                                        <option value={true}>YES</option>
                                                                        <option value={false}>NO</option>
                                                                        </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                               
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">User</label>
                                                            <div class="col-sm-9">
                                                                <select required type="text" value={this.props.accessorybookingbyid.userId?this.props.accessorybookingbyid.userId:"0"}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "userId")} >
                                                                      <option value={0}>Select</option>
                                                                       {this.props.getuser.map(obj=>(
                                                                            <option value={obj.userId}>{obj.emailId}</option>
                                                                        ))}
                                                                        </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Name</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.accessorybookingbyid.userName ? this.props.accessorybookingbyid.userName : ""}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "userName")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Contact Number</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.accessorybookingbyid.phoneNumber ? this.props.accessorybookingbyid.phoneNumber : ""}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "phoneNumber")} />
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">EmailId</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.accessorybookingbyid.emailId?this.props.accessorybookingbyid.emailId: ""}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e,"emailId")} />
                                                            </div>
                                                        </div>
                                                    </div>   
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Given Date</label>
                                                            <div class="col-sm-9">
                                                                <input required type="date" value={this.props.accessorybookingbyid.givenDate ? this.props.accessorybookingbyid.givenDate : ""}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "givenDate")} />
                                                            </div>
                                                        </div>
                                                    </div>  
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Returned Date</label>
                                                            <div class="col-sm-9">
                                                                <input required type="date" value={this.props.accessorybookingbyid.returnedDate ? this.props.accessorybookingbyid.returnedDate : ""}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "returnedDate")} />
                                                            </div>
                                                        </div>
                                                    </div> 
                                                  
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Price</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.accessorybookingbyid.price ? this.props.accessorybookingbyid.price : ""}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "price")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Discount Price</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.accessorybookingbyid.discountPrice ? this.props.accessorybookingbyid.discountPrice : ""}
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "discountPrice")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Status</label>
                                                            <div class="col-sm-9">
                                                                <select  value={this.props.accessorybookingbyid.statusId ? this.props.accessorybookingbyid.statusId : "0" }
                                                                    class="form-control" onChange={(e) => this.updateBooking(e, "statusId")} >
                                                                        <option value={0}>Select</option>
                                                                        {this.props.getstatusbytype.map(obj=>(
                                                                            <option value={obj.statusId}>{`${obj.statusCode}`}</option>
                                                                        ))}
                                                                        </select>
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
                                            <h4 class="card-title">Bokings<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">BookingId</label>
                                                    
                                                    <div class="col-sm-9">
                                                   <input required type="text" value={this.state.accessaryid!=="0"?this.state.accessaryid:""}
                                                                    class="form-control" onChange={(e) => this.setState({accessaryid:e.target.value})} />
                                                    <button type="button" class="btn btn-info" onClick={(e)=>this.getAcessarybyid(e)}>
                                                        <span class="icon-search"></span> Search
                                                    </button> 
                                                    </div>
                                                    </div>
                                                
                                            </div>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[

                                                {
                                                    Header: "Booking ID",
                                                    accessor: "accessoryBookingId",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },                                                
                                                {
                                                    Header: "Accessory Code",
                                                    accessor: "accessoryId",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Name",
                                                    accessor: "userName",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Date",
                                                    accessor: "givenDate",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Returned Date",
                                                    accessor: "returnedDate",
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
                                                    Header:"Actions",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    },
                                                    accessor: d => d.accessoryBookingId,
                                                    maxWidth: 300,
                                                    Cell: row => (
                                                        <div className="template-demo">
                                                            <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                <i class="mdi mdi-pencil-outline"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                                <i class="mdi mdi-delete-outline"></i>
                                                            </button>
                                                            <button type="button" value={row.value} class="btn btn-icon">
                                                                <Link to={`/admin/payments/Acessory/${row.value}`}>Payments</Link>
                                                            </button>
                                                        </div>)
                                                }
                                            ]}
                                                data={this.props.accessorybookings}
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
        accessorybookings: state.goAdvStore.accessorybookings,
        accessorybookingbyid: state.goAdvStore.accessorybookingbyid,
        accessories: state.goAdvStore.accessories,
        getaccessarytype:state.goAdvStore.getaccessarytype,
        getcostcenter: state.goAdvStore.getcostcenter,
        getallcostcentres:state.goAdvStore.getallcostcentres,
        getuser:state.goAdvStore.getuser,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData,
        getstatusbytype:state.goAdvStore.getstatusbytype
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord })(AccessoriesBooking);
    //export default Trip

