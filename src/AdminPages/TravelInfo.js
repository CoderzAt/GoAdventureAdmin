import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,travelinfopostapi,getcities,getalltravelinfo,gettravelinfobyid,travelinfoupdateapi} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'

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
class TravelInfo extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           vehicleNumber: null,
           vehicleName: null,
           vehicleOwner: null,
           vehicleContactNumber:null,
           agencyName: null,
           locationDetails: null,
           cityId:1,
           travelinfo:[],
           editData:[],
           cities:[]
           
       }
    }
   async componentDidMount()
     {
    
        let data= await loadData(getcities)
        let travelinfo=await loadData(getalltravelinfo)
        this.setState({
           cities:data,
           travelinfo:travelinfo
        })
     }  
     vehchilenameOperation(event)
    {
      this.setState({
            vehicleName:event.target.value
        })
    }
    vechchilenumberOperation(event)
    {
        
   this.setState({
            vehicleNumber:event.target.value
        })

    }
    vehchileownerOperation(event)
    {
  this.setState({
            vehicleOwner:event.target.value
        })
    }
    vehchilecontactnumberOperation(event)
    {
  this.setState({
            vehicleContactNumber:event.target.value
        })
    }
    locationdetailsOperation(event)
    {
  this.setState({
            locationDetails:event.target.value
        })
    }
    cityIdOperation(event)
    {
  this.setState({
            cityId:event.target.value
        })
    }
    agencynameOperation(event)
    {
  this.setState({
            agencyName:event.target.value
        })
    }
    
     async editReacord(id)
    {
        
        let url=gettravelinfobyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

        this.setState({
            vehicleNumber:this.state.editData.vehicleNumber,
            vehicleName:this.state.editData.vehicleName,
            vehicleOwner:this.state.editData.vehicleOwner,
            vehicleContactNumber:parseInt(this.state.editData.vehicleContactNumber),
            agencyName:this.state.editData.agencyName,
            locationDetails:this.state.editData.locationDetails,
            cityId:parseInt(this.state.editData.cityId)
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
            travelInfoId:this.state.editData.travelInfoId,
            vehicleNumber:this.state.vehicleNumber,
            vehicleName:this.state.vehicleName,
            vehicleOwner:this.state.vehicleOwner,
            vehicleContactNumber:parseInt(this.state.vehicleContactNumber),
            agencyName:this.state.agencyName,
            locationDetails:this.state.locationDetails,
            cityId:parseInt(this.state.cityId)
                            }

        let editurl=travelinfoupdateapi+this.state.editData.travelInfoId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    } 
    async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            travelInfoId:0,
            vehicleNumber:this.state.vehicleNumber,
            vehicleName:this.state.vehicleName,
            vehicleOwner:this.state.vehicleOwner,
            vehicleContactNumber:parseInt(this.state.vehicleContactNumber),
            agencyName:this.state.agencyName,
            locationDetails:this.state.locationDetails,
            cityId:parseInt(this.state.cityId)
              }
             let message = await  postData(obj,travelinfopostapi,'Post');
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
            if(this.state.editData.travelInfoId == undefined)
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
                            </span> TravelInfo
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    TravelInfo
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">TravelInfo</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Vehchile Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.vehicleName} class="form-control" onChange={(e)=>this.vehchilenameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Vehchile Number</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.vehicleNumber} class="form-control" onChange={(e)=>this.vechchilenumberOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Vehchile Owner</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  defaultValue={this.state.editData.vehicleOwner} class="form-control"  onChange={(e)=>this.vehchileownerOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Vehchile Contact number</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.vehicleContactNumber}  class="form-control"  onChange={(e)=>this.vehchilecontactnumberOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Agency Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.agencyName}  class="form-control"  onChange={(e)=>this.agencynameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Location Details</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.locationDetails}  class="form-control"  onChange={(e)=>this.locationdetailsOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
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
                                            </div>
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
                                    <h4 class="card-title">List</h4>
                                    <div class="table-responsive"></div>
                                      <ReactTable columns={[
                                   
                                  {
                                    Header: "VehckeName",
                                    accessor: "vehicleName"
                                    
                                  },
                                  {
                                    Header: "VehicleOwner",
                                    accessor: "vehicleOwner"
                                    
                                  },
                                  {
                                    Header: "VehicleContactNumber",
                                    accessor: "vehicleContactNumber"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.travelInfoId,
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
                                data={this.state.travelinfo}
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
    export default TravelInfo

