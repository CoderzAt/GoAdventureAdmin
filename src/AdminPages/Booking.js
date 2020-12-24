import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,getbookings, bookingpostapi,getbookingbyid,bookingupdateapi,traveltypegetapi,gettrips,getaccessories,getactivities,getallusers,GET_BOOKING_BYID,GET_BOOKING,POST_BOOKING,PUT_BOOKING,GET_ACTIVITIES,GET_TRAVELTYPE,GET_ALL_ACCESSORIES,GET_TRIP,GET_USER} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import * as validation from '../Shared/Validations'

import { connect } from 'react-redux';
import { getData,postData1,putData1,updatePropAccData,resetData,removeErrormsg } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import { Multiselect } from 'multiselect-react-dropdown';





var condition=false;
class Booking extends Component {
    constructor(props) {
        super(props);
       this.state = {
        tripId: "0",
        noOfUsers:0,
        travelTypeId: "0",
        accessoryId:"0",
        activityIds:"",
        userId:"0",
        primaryContact:null,
        secondaryContact:null,
        emailId:null,
        contactAddress:null,
        primaryContactAadharNo:null,
        totalAmount:0,
        appliedCoupon:null,
        bookingDate:null,
        cancellationDate:null,
        cancellationFee:0,
        isAmountReturned:null,
        returnedAmount: 0,
        editData:[],
        bookings:[],
        traveltypes:[],
        trips:[],
        accessories:[],
        activities:[],
        users:[],
        errors:{}
         }
    }
    componentWillMount()
    {
      this.props.removeErrormsg()
  
    }
      componentDidMount()
     {
         debugger
       this.props.getData(action.GET_TRAVELTYPE,GET_TRAVELTYPE)
       this.props.getData(action.GET_BOOKING,GET_BOOKING);
       this.props.getData(action.GET_TRIP,GET_TRIP)
       this.props.getData(action.GET_ALL_ACCESSORIES,GET_ALL_ACCESSORIES) 
       this.props.getData(action.GET_AVCTIVITIES,GET_ACTIVITIES)
       this.props.getData(action.GET_USER,GET_USER)
        }   //there is an issue with api
    tripOperation(event)
    {
      this.setState({
            tripId:event.target.value
        })
    }
    noofusersOperation(event)
    {
   this.setState({
            noOfUsers:event.target.value
        })

    }
    traveltypeOperation(event)
    {
  this.setState({
            travelTypeId:event.target.value
        })
    }
   /*  stayOperation(event)
    {
  this.setState({
            endDate:event.target.value
        })
    } */
    AccessoriesOperation(event)
    {
  this.setState({
            accessoryId:event.target.value
        })
    }
    ActivityidOperation(event)
    {
  this.setState({
            activityIds:event.target.value
        })
    }
    useridOperation(event)
    {
  this.setState({
            userId:event.target.value
        })
    }
    primarycontactOperation(event)
    {
  this.setState({
            primaryContact:event.target.value
        })
    }
    secondarycontactOperation(event)
    {
  this.setState({
            secondaryContact:event.target.value
        })
    }
    emailOperation(event)
    {
  this.setState({
            emailId:event.target.value
        })
    }
    contactadressOperation(event)
    {
  this.setState({
            contactAddress:event.target.value
        })
    }
    primarycontactadharnumberOperation(event)
    {
  this.setState({
            primaryContactAadharNo:event.target.value
        })
    }
    totalamountOperation(event)
    {
  this.setState({
            totalAmount:event.target.value
        })
    }
    appliedcouponOperation(event)
    {
  this.setState({
            appliedCoupon:event.target.value
        })
    }
    bookingdateOperation(event)
    {
  this.setState({
            bookingDate:event.target.value
        })
    }
    cancellationfeeOperation(event)
    {
  this.setState({
            cancellationFee:event.target.value
        })
    }
    cancellationdateOperation(event)
    {
  this.setState({
            cancellationDate:event.target.value
        })
    }
    isamountreturnedOperation(event)
    {
  this.setState({
            isAmountReturned:event.target.value
        })
    }
    returnedamountOperation(event)
    {
  this.setState({
            returnedAmount:event.target.value
        })
    }
    
    async editReacord(id)
    {
        
        let url=getbookingbyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

        this.setState({
            tripId:editdata.tripId,
            noOfUsers:parseInt(editdata.noOfUsers),
            travelTypeId:parseInt(editdata.travelTypeId),
            accessories:editdata.accessories,
            activityIds:this.state.activityIds,
            userId:parseInt(editdata.userId),
            primaryContact:editdata.primaryContact,
            secondaryContact:editdata.secondaryContact,
            emailId:editdata.emailId,
            contactAddress:editdata.contactAddress,
            primaryContactAadharNo:editdata.primaryContactAadharNo,
            totalAmount:parseInt(editdata.totalAmount),
            appliedCoupon:editdata.appliedCoupon,
            bookingDate:editdata.bookingDate,
            cancellationDate:editdata.cancellationDate,
            cancellationFee:parseInt(editdata.cancellationDate),
            isAmountReturned:editdata.isAmountReturned,
            returnedAmount:parseInt(editdata.returnedAmount)
           
        })
    } 
    /* deleteRecord(id)
    {
        alert("in delete id no is"+id)
        fetch(deletecountry+id, {
            method: 'DELETE'
          });

    }*/
 
     async postEditedData()
    {
        debugger
        
        const obj={
            bookingId:this.state.editData.bookingId,
            tripId:parseInt(this.state.tripId),
            noOfUsers:parseInt(this.state.noOfUsers),
            travelTypeId:parseInt(this.state.travelTypeId),
            accessories:this.state.accessoryId,
            activityIds:this.state.activityIds,
            userId:parseInt(this.state.userId),
            primaryContact:this.state.primaryContact,
            secondaryContact:this.state.secondaryContact,
            emailId:this.state.emailId,
            contactAddress:this.state.contactAddress,
            primaryContactAadharNo:this.state.primaryContactAadharNo,
            totalAmount:parseInt(this.state.totalAmount),
            appliedCoupon:this.state.appliedCoupon,
            bookingDate:this.state.bookingDate,
            cancellationDate:this.state.cancellationDate,
            cancellationFee:parseInt(this.state.cancellationFee),
            isAmountReturned:this.state.isAmountReturned,
            returnedAmount:parseInt(this.state.returnedAmount)
           }

        let editurl=bookingupdateapi+this.state.editData.bookingId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    }
    async postDatatoApi()
    {
        debugger

        condition=true;
        const obj={
        bookingId: 0,
        tripId:parseInt(this.state.tripId),
        noOfUsers:parseInt(this.state.noOfUsers),
        travelTypeId:parseInt(this.state.travelTypeId),
        accessories:this.state.accessoryId,
        activityIds:this.state.activityIds,
        userId:parseInt(this.state.userId),
        primaryContact:this.state.primaryContact,
        secondaryContact:this.state.secondaryContact,
        emailId:this.state.emailId,
        contactAddress:this.state.contactAddress,
        primaryContactAadharNo:this.state.primaryContactAadharNo,
        totalAmount:parseInt(this.state.totalAmount),
        appliedCoupon:this.state.appliedCoupon,
        bookingDate:this.state.bookingDate,
        cancellationDate:this.state.cancellationDate,
        cancellationFee:parseInt(this.state.cancellationFee),
        isAmountReturned:this.state.isAmountReturned,
        returnedAmount:parseInt(this.state.returnedAmount)
    }
            let message = await  postData(obj,bookingpostapi,'Post');
             alert (message);
             window.location.reload();//page refresh
    }
    handlevalidation()
    {
        let state=this.state;
        this.setState({
            errors:{
                trip:validation.selectvalidation(state.tripId),
                traveltype:validation.selectvalidation(state.travelTypeId),
                accessory:validation.selectvalidation(state.accessoryId),
                //activity:validation.selectvalidation(state.activityIds),
                user:validation.selectvalidation(state.userId)

            }
        })
    }
    postBookingData()
    {
        debugger
        
        const obj = {
        bookingId:this.props.getbookingbyid.bookingId?this.props.getbookingbyid.bookingId:0,
        tripId:parseInt(this.props.getbookingbyid.tripId),
        noOfUsers:parseInt(this.props.getbookingbyid.noOfUsers),
        travelTypeId:parseInt(this.props.getbookingbyid.travelTypeId),
        accessories:this.props.getbookingbyid.accessories,
        activityIds:this.props.getbookingbyid.activityIds,
        userId:parseInt(this.props.getbookingbyid.userId),
        primaryContact:this.props.getbookingbyid.primaryContact,
        secondaryContact:this.props.getbookingbyid.secondaryContact,
        emailId:this.props.getbookingbyid.emailId,
        contactAddress:this.props.getbookingbyid.contactAddress,
        primaryContactAadharNo:this.props.getbookingbyid.primaryContactAadharNo,
        totalAmount:parseInt(this.props.getbookingbyid.totalAmount),
        appliedCoupon:this.props.getbookingbyid.appliedCoupon,
        bookingDate:this.props.getbookingbyid.bookingDate,
        cancellationDate:this.props.getbookingbyid.cancellationDate,
        cancellationFee:parseInt(this.props.getbookingbyid.cancellationFee),
        isAmountReturned:JSON.parse(this.props.getbookingbyid.isAmountReturned),
        returnedAmount:parseInt(this.props.getbookingbyid.returnedAmount),
        isDeleted:this.props.getbookingbyid.bookingId?false:true
               };
        
        let url = PUT_BOOKING+ this.props.getbookingbyid.bookingId;
        if (this.props.getbookingbyid.bookingId) {
            this.props.putData1(action.PUT_BOOKING,url,obj);
        }
        else {
            this.props.postData1(action.POST_BOOKING,POST_BOOKING,obj);
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
        this.postBookingData();
    }   
    } 
    handleReset() {
        this.props.resetData(action.RESET_DATA,"getbookingbyid");
            this.setState({ validated: false });
      }
    editReacord(id) {
        this.props.getData(action.GET_ALL_ACCESSORIES,GET_ALL_ACCESSORIES)
        this.props.getData(action.GET_BOOKING_BYID,GET_BOOKING_BYID+id)
    }
    updateBooking = (e, paramName) => {
        var value
        if(paramName === "accessories")
        {
            value= Array.prototype.map.call(e, function(item) { return item.accessoriesId;}).join(",");
        }
        else if(paramName === "activityIds")
        {
            value= Array.prototype.map.call(e, function(item) { return item.activityId;}).join(",");   
        }
        else
        {
             value=e.target.value
        }
        this.props.updatePropAccData(paramName,value,"getbookingbyid");
        this.setState({ refreshflag: !this.state.refreshflag });
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
                            </span>Booking
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
                                    Booking
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Booking</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                    <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Trip</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.getbookingbyid.tripId?this.props.getbookingbyid.tripId:"0"}
                                                     onChange={(e)=>this.updateBooking(e,"tripId")}>
                                                       <option value={0}>Select</option>
                                                        {this.props.gettrip.map(obj=>
                                                         <option value={obj.tripId}>{obj.tripName}</option>
                                                          )}
                                                   </select>
                                                   <div style={{color:"red"}}>{this.state.errors.trip}</div>
                                                   </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">No.of Users</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.getbookingbyid.noOfUsers?this.props.getbookingbyid.noOfUsers:""} 
                                                        class="form-control" onChange={(e)=>this.updateBooking(e,"noOfUsers")}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">TravelType</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.getbookingbyid.travelTypeId?this.props.getbookingbyid.travelTypeId:"0"} 
                                                    onChange={(e)=>this.updateBooking(e,"travelTypeId")}>
                                                         <option value={0}>Select</option>
                                                        {this.props.gettraveltype.map(obj=>
                                                         <option value={obj.travelTypeId}>{obj.travelTypeName}</option>
                                                          )}
                                                   </select>
                                                   <div style={{color:"red"}}>{this.state.errors.traveltype}</div>
                                                   </div>
                                                </div>
                                            </div>
                                           {/*  <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Stay</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number"   class="form-control"  onChange={(e)=>this.stayOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div> */}
                                              <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Accessories</label>
                                                    <div class="col-sm-9">
                                                    <Multiselect selectedValues={this.props.accessoryids}  options={this.props.accessories} displayValue={"accessoryName"} 
                                                    class="form-control" onSelect={(e)=>this.updateBooking(e,"accessories")} onRemove={(e)=>this.updateBooking(e,"accessories")} />
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Accessory</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.getbookingbyid.accessoriesId?this.props.getbookingbyid.accessoriesId:"0"}
                                                     onChange={(e)=>this.updateBooking(e,"accessoriesId")}>
                                                    <option value={0}>Select</option>
                                                        {this.props.accessories.map(obj=>
                                                         <option value={obj.accessoriesId}>{obj.accessoryName}</option>
                                                          )}
                                                   </select>
                                                   <div style={{color:"red"}}>{this.state.errors.accessory}</div>
                                                   </div>
                                                </div>
                                                </div> */}
                                                <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Activity</label>
                                                    <div class="col-sm-9">
                                                    <Multiselect selectedValues={this.props.activityids}  options={this.props.activities} displayValue={"activityName"} 
                                                    class="form-control" onSelect={(e)=>this.updateBooking(e,"activityIds")} onRemove={(e)=>this.updateBooking(e,"activityIds")} />
                                                   {/*  <select class="form-control travellerMode" value={this.props.getbookingbyid.activityIds?this.props.getbookingbyid.activityIds:"0"} 
                                                    onChange={(e)=>this.updateBooking(e,"activityIds")}>
                                                    <option value={0}>Select</option>
                                                        {this.props.activities.map(obj=>
                                                         <option value={obj.activityId}>{obj.activityName}</option>
                                                          )}
                                                   </select> */}
                                                   </div>
                                                </div>
                                                </div>
                                                
                                                <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">User</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.getbookingbyid.userId?this.props.getbookingbyid.userId:"0"} 
                                                    onChange={(e)=>this.updateBooking(e,"userId")}>
                                                        <option value={0}>Select</option>
                                                        {this.props.getuser.map(obj=>
                                                         <option value={obj.userId}>{obj.firstName}</option>
                                                          )}
                                                   </select>
                                                   <div style={{color:"red"}}>{this.state.errors.user}</div>
                                                   </div>
                                                </div>
                                                </div>
                                                   <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Primary Contact</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.getbookingbyid.primaryContact?this.props.getbookingbyid.primaryContact:""}   
                                                        class="form-control"  onChange={(e)=>this.updateBooking(e,"primaryContact")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Secondary Contact</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.getbookingbyid.secondaryContact?this.props.getbookingbyid.secondaryContact:""}  
                                                         class="form-control"  onChange={(e)=>this.updateBooking(e,"secondaryContact")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Email Id</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  value={this.props.getbookingbyid.emailId?this.props.getbookingbyid.emailId:""}  
                                                        class="form-control"  onChange={(e)=>this.updateBooking(e,"emailId")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Contact Address</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getbookingbyid.contactAddress?this.props.getbookingbyid.contactAddress:""}  
                                                        class="form-control"  onChange={(e)=>this.updateBooking(e,"contactAddress")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Primary Contact Adhar Number</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getbookingbyid.primaryContactAadharNo?this.props.getbookingbyid.primaryContactAadharNo:""} 
                                                         class="form-control"  onChange={(e)=>this.updateBooking(e,"primaryContactAadharNo")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Total Amount</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.getbookingbyid.totalAmount?this.props.getbookingbyid.totalAmount:""} 
                                                        class="form-control"  onChange={(e)=>this.updateBooking(e,"totalAmount")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Applied Coupon</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  value={this.props.getbookingbyid.appliedCoupon?this.props.getbookingbyid.appliedCoupon:""} 
                                                        class="form-control"  onChange={(e)=>this.updateBooking(e,"appliedCoupon")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Booking Date</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getbookingbyid.bookingDate?this.props.getbookingbyid.bookingDate:""}  
                                                        class="form-control"  onChange={(e)=>this.updateBooking(e,"bookingDate")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Cancellation Date</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getbookingbyid.cancellationDate?this.props.getbookingbyid.cancellationDate:""}  
                                                        class="form-control"  onChange={(e)=>this.updateBooking(e,"cancellationDate")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Cancellation Fee</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.getbookingbyid.cancellationFee?this.props.getbookingbyid.cancellationFee:""}
                                                         class="form-control"  onChange={(e)=>this.updateBooking(e,"cancellationFee")}/>
                                                    </div>
                                                </div>
                                            </div>
                                          <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">IsAmount Returned</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.getbookingbyid.isAmountReturned?this.props.getbookingbyid.isAmountReturned:"0"} 
                                                    onChange={(e)=>this.updateBooking(e,"isAmountReturned")}>
                                                    <option value={0}>Select</option>
                                                        <option value={true}>YES</option>
                                                        <option value={false}>NO</option>
                                                   </select>
                                                   </div>
                                                </div>
                                                </div>
                                                
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Returned Amount</label>
                                                    <div class="col-sm-9">
                                                        <input  type="number" value={this.props.getbookingbyid.returnedAmount?this.props.getbookingbyid.returnedAmount:""} 
                                                        class="form-control"  onChange={(e)=>this.updateBooking(e,"returnedAmount")}/>
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
                                    <h4 class="card-title">Bookings</h4>
                                    <div class="table-responsive"></div>
                                      <ReactTable columns={[
                                   
                                  {
                                    Header: "PrimaryContact",
                                    accessor: "primaryContact"
                                    
                                  },
                                  {
                                    Header: "SecondaryContact",
                                    accessor: "secondaryContact"
                                    
                                  },
                                  {
                                    Header: "emailId",
                                    accessor: "emailId"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.bookingId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => {  this.deleteRecord(row.value)}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                      </div>)
                                 }
                                ]}
                                data={this.props.getbooking}
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
            gettrip:state.goAdvStore.gettrip,
            gettraveltype:state.goAdvStore.gettraveltype,
            activities:state.goAdvStore.activities,
            accessories:state.goAdvStore.accessories,
            getbooking:state.goAdvStore.getbooking,
            getuser:state.goAdvStore.getuser,
           message: state.goAdvStore.message,
          messageData: state.goAdvStore.messageData,
          getbookingbyid:state.goAdvStore.getbookingbyid,
          accessoryids:state.goAdvStore.accessoryids,
          activityids:state.goAdvStore.activityids
        }
      }
      export default connect(mapStateToProps, { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg})(Booking);
    
    //export default Booking

