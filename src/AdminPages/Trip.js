import React, {Component,useState} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,trippostapi,tripupdateapi,gettrips, gettripbyid,gettripbypackage,getpackages,traveltypegetapi,getstaytypes} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
import { Multiselect } from 'multiselect-react-dropdown';
import {gettingMultiselectValues} from '../Shared/ReauasbleFunctions'
/* import './assets/vendors/mdi/css/materialdesignicons.min.css';
import './assets/vendors/css/vendor.bundle.base.css';
import './assets/css/style.css'; */
/* import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js' */



var condition=false;


class Trip extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           tripName:null,
           packageId:null,
           startDate:null,
           endDate:null,
           treckLeaderId:null,
           strengthLimit:null,
           travelTypeIds:null,
           basePrice:null,
           discountPrice:null,
           maxPrice:null,
           couponCode:null,
           stayTypeIds:null,
           editData:[],
           trips:[],
           packages:[],
           traveltypes:[],
           staytypes:[],
           traveltypenames:[],
           staytypenames:[]
         }
       
    }
     async componentDidMount()
     {
         debugger
         var url

         if(this.props.match.params.tid != undefined)
         {
        let valuefromurl=parseInt(this.props.match.params.tid);
        url=gettripbypackage+valuefromurl;
         }
         else
         {
           url=gettrips
         }
    
        let data= await loadData(url)
        this.setState({
           trips:data
        })

        let package1=await loadData(getpackages)
        this.setState({
            packages:package1
        })
        let traveltype=await loadData(traveltypegetapi)
        this.setState({
            traveltypes:traveltype
        })

        this.setState({
            staytypes:await loadData(getstaytypes)
        })
     }
    tripnameOperation(event)
    {
        
      this.setState({
            tripName:event.target.value
        })
    }
    packageOperation(event)
    {
        
   this.setState({
            packageId:event.target.value
        })

    }
    startdateOperation(event)
    {
  this.setState({
            startDate:event.target.value
        })
    }
    enddateOperation(event)
    {
  this.setState({
            endDate:event.target.value
        })
    }
    treckleaderOperation(event)
    {
  this.setState({
            treckLeaderId:event.target.value
        })
    }
    strengthlimitOperation(event)
    {
  this.setState({
            strengthLimit:event.target.value
        })
    }
   
    basepriceOperation(event)
    {
  this.setState({
            basePrice:event.target.value
        })
    }
    discountpriceOperation(event)
    {
  this.setState({
            discountPrice:event.target.value
        })
    }
    maxpriceOperation(event)
    {
  this.setState({
            maxPrice:event.target.value
        })
    }
   async tripbypackageOperation(event)
    { 
       //alert(event.target.value)
      let url=gettripbypackage+(event.target.value);
      let trip1=await loadData(url)
      this.setState({
          trips:trip1
      })
    }
    
     async editReacord(id)
    {
        debugger
        let url=gettripbyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })
      let traveltypenames1=gettingMultiselectValues(editdata.travelTypeIds,this.state.traveltypes)
        this.setState({
            traveltypenames:traveltypenames1
        })
console.log("traveltypenames",this.state.traveltypenames)

let staytypenames1=this.gettingstaytypeids(editdata.stayTypeIds,this.state.staytypes)
this.setState({
    staytypenames:staytypenames1
})
console.log("staytypenames",this.state.staytypenames)

        this.setState({
           tripName:editdata.tripName,
           packageId:editdata.packageId,
           startDate:editdata.startDate,
           endDate:editdata.endDate,
           treckLeaderId:editdata.treckLeaderId,
           strengthLimit:editdata.strengthLimit,
           travelTypeIds:editdata.travelTypeIds,
           basePrice:editdata.basePrice,
           discountPrice:editdata.discountPrice,
           maxPrice:editdata.maxPrice,
           couponCode:editdata.couponCode,
           stayTypeIds:editdata.stayTypeIds
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
        alert("in post edit")
        const obj={
            tripId:this.state.editData.tripId,
            tripName:this.state.tripName,
            packageId:parseInt(this.state.packageId),
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            treckLeaderId:parseInt(this.state.treckLeaderId),
            strengthLimit:parseInt(this.state.strengthLimit),
            travelTypeIds:this.state.travelTypeIds,
            basePrice:parseInt(this.state.basePrice),
            maxPrice:parseInt(this.state.maxPrice),
            stayTypeIds:this.state.stayTypeIds,
            couponCode:this.state.couponCode
            }
        let editurl=tripupdateapi+this.state.editData.tripId;
        let editeddata=await postData(obj,editurl,'Put')
        alert(editeddata)
        window.location.reload();//page refresh
 } 
    async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
           tripId: 0,
           tripName:this.state.tripName,
           packageId:parseInt(this.state.packageId),
           startDate:this.state.startDate,
           endDate:this.state.endDate,
           treckLeaderId:parseInt(this.state.treckLeaderId),
           strengthLimit:parseInt(this.state.strengthLimit),
           travelTypeIds:this.state.travelTypeIds,
           basePrice:parseInt(this.state.basePrice),
            maxPrice:parseInt(this.state.maxPrice),
            stayTypeIds:this.state.stayTypeIds,
            couponCode:this.state.couponCode
     }
             let message = await  postData(obj,trippostapi,'Post');
             alert (message);
             //window.location.reload();//page refresh
    }
    async handleSubmit(event)
    {
        debugger
        const form = event.currentTarget;
        console.log("checkform",form.checkValidity())
        if(form.checkValidity() === false)
        {
          event.preventDefault();
          event.stopPropagation();
        }
        else
        {
            event.preventDefault();
            if(this.state.editData.tripId== undefined)
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
            editData:[],
            traveltypenames:[],
            staytypenames:[]
            })
    }
     handlemultiselect(e)
    {
      let data= Array.prototype.map.call(e, function(item) { return item.travelTypeId; }).join(",");
       this.setState({
           travelTypeIds:data
       })
       console.log("multiselect",this.state.travelTypeIds)
    }
    staytypeidOpeartion(e)
    {
        let data= Array.prototype.map.call(e, function(item) { return item.stayTypeId; }).join(",");
       this.setState({
           stayTypeIds:data
       })
       }
    gettingstaytypeids(ids,list)
     {
    let staytypeids=(ids).split(",");
    let staytypenames1=[]

    staytypeids.map(obj=>
        list.map((item)=>{
            if(parseInt(obj) == item.stayTypeId)
            {
              staytypenames1.push({stayTypeName:item.stayTypeName,stayTypeId:item.stayTypeId});
            }
        }))

        return staytypenames1
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
                                <div class="card-body">
                                    <h4 class="card-title">Trip</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.tripName}  class="form-control" onChange={(e)=>this.tripnameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Package</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.packageOperation(e)}>
                                                       {this.state.packages.map(obj=>
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
                                                        <input required type="number" defaultValue={this.state.editData.packageId} class="form-control" onChange={(e)=>this.packageOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">StartDate</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.startDate} class="form-control"  onChange={(e)=>this.startdateOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">EndDate</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.endDate}  class="form-control"  onChange={(e)=>this.enddateOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">TreckLeader Id</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.treckLeaderId}  class="form-control"  onChange={(e)=>this.treckleaderOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Strength Limit</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.strengthLimit}   class="form-control"  onChange={(e)=>this.strengthlimitOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">TravelType Ids</label>
                                                    <div class="col-sm-9">
                                                    <Multiselect  selectedValues={this.state.traveltypenames} options={this.state.traveltypes} displayValue={"travelTypeName"} onSelect={(e)=>this.handlemultiselect(e)} onRemove={(e)=>this.handlemultiselect(e)} /> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">BasePrice</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.basePrice}  class="form-control"  onChange={(e)=>this.basepriceOperation(e)}/>
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
                                                        <input required type="number"  defaultValue={this.state.editData.maxPrice} class="form-control"  onChange={(e)=>this.maxpriceOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">CouponCode</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  defaultValue={this.state.editData.couponCode} class="form-control"  onChange={(e)=>this.couponCodeOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">StayTypeIds</label>
                                                    <div class="col-sm-9">
                                                    <Multiselect selectedValues={this.state.staytypenames}  options={this.state.staytypes} displayValue={"stayTypeName"} onSelect={(e)=>this.staytypeidOpeartion(e)} onRemove={(e)=>this.staytypeidOpeartion(e)} /> 
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
                                    <h4 class="card-title">Trips</h4>
                                    <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Package</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.tripbypackageOperation(e)}>
                                                       {this.state.packages.map(obj=>
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
                                    accessor: "tripName"
                                    
                                  },
                                  {
                                    Header: "BasePrice",
                                    accessor: "basePrice"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.tripId,
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
                                data={this.state.trips}
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
    export default Trip

