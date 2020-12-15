import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,getbookings, bookingpostapi,getbookingbyid,bookingupdateapi,traveltypegetapi,gettrips,getaccessories,getactivities,getallusers} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
import * as validation from '../Shared/Validations'

/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */
/* import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js' */



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
     async componentDidMount()
     {
         debugger
    
        let travel= await loadData(traveltypegetapi)
        this.setState({
           traveltypes:travel
        })

        let data= await loadData(getbookings)
        this.setState({
           bookings:data
        })
        let trip= await loadData(gettrips)
        this.setState({
            trips:trip
        })
        let accessories=await loadData(getaccessories)
        this.setState({
              accessories:accessories
        })
        let activities=await loadData(getactivities)
        this.setState({
           activities:activities
        })
         this.setState({
             users:await loadData(getallusers)
         })
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
    async handleSubmit(event)
    {
        event.preventDefault();
        this.handlevalidation();
        debugger
        const form = event.currentTarget;
        console.log("checkform",form.checkValidity())
        if(form.checkValidity() === false || validation.validateForm(this.state.errors) === false)
        {
          event.preventDefault();
          event.stopPropagation();
        }
        else
        {
            event.preventDefault();
            if(this.state.editData.bookingId == undefined)
              this.postDatatoApi()
            else
              this.postEditedData()
        }
      this.setState({
            validated:true
        })

    } 
 handleReset()
    {
        this.setState({
            editData:[]
            })
    }

    render() {
	    return (
         <div>
             <div class="container-scroller">
        </div>
       <AdminHeader/>
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
                                                    <select class="form-control travellerMode" onChange={(e)=>this.tripOperation(e)}>
                                                       <option value={0}>Select</option>
                                                        {this.state.trips.map(obj=>
                                                         <option value={obj.travelId}>{obj.tripName}</option>
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
                                                        <input required type="number" defaultValue={this.state.editData.noOfUsers} class="form-control" onChange={(e)=>this.noofusersOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">TravelType</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.traveltypeOperation(e)}>
                                                         <option value={0}>Select</option>
                                                        {this.state.traveltypes.map(obj=>
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
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Accessory</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.AccessoriesOperation(e)}>
                                                    <option value={0}>Select</option>
                                                        {this.state.accessories.map(obj=>
                                                         <option value={obj.accessoriesId}>{obj.accessoryName}</option>
                                                          )}
                                                   </select>
                                                   <div style={{color:"red"}}>{this.state.errors.accessory}</div>
                                                   </div>
                                                </div>
                                                </div>
                                                <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Activity</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.ActivityidOperation(e)}>
                                                    <option value={0}>Select</option>
                                                        {this.state.activities.map(obj=>
                                                         <option value={obj.activityId}>{obj.activityName}</option>
                                                          )}
                                                   </select>
                                                   </div>
                                                </div>
                                                </div>
                                                
                                                <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">User</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.useridOperation(e)}>
                                                        <option value={0}>Select</option>
                                                        {this.state.users.map(obj=>
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
                                                        <input required type="number" defaultValue={this.state.editData.primaryContact}   class="form-control"  onChange={(e)=>this.primarycontactOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Secondary Contact</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.secondaryContact}   class="form-control"  onChange={(e)=>this.secondarycontactOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Email Id</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  defaultValue={this.state.editData.emailId}  class="form-control"  onChange={(e)=>this.emailOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Contact Address</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.contactAddress}  class="form-control"  onChange={(e)=>this.contactadressOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Primary Contact Adhar Number</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.primaryContactAadharNo}  class="form-control"  onChange={(e)=>this.primarycontactadharnumberOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Total Amount</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.totalAmount} class="form-control"  onChange={(e)=>this.totalamountOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Applied Coupon</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  defaultValue={this.state.editData.appliedCoupon} class="form-control"  onChange={(e)=>this.appliedcouponOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Booking Date</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.bookingDate}  class="form-control"  onChange={(e)=>this.bookingdateOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Cancellation Date</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.cancellationDate}  class="form-control"  onChange={(e)=>this.cancellationdateOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Cancellation Fee</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.cancellationFee}  class="form-control"  onChange={(e)=>this.cancellationfeeOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">IsAmount Returned</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.isAmountReturned}  class="form-control"  onChange={(e)=>this.isamountreturnedOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>  
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Returned Amount</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.returnedAmount} class="form-control"  onChange={(e)=>this.returnedamountOperation(e)}/>
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
                                data={this.state.bookings}
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
    export default Booking

