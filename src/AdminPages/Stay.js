import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,getcities,staypostapi,getstays,getstaybyid,stayupdateapi,getstaytypes} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Multiselect } from 'multiselect-react-dropdown';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
import {gettingMultiselectValues} from '../Shared/ReauasbleFunctions'
/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */
/*import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js'*/

var condition=false;
class Stay extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           stayId: 0,
           stayName:null,
           rateType:null,
           StayTypeIds:null,
           contactInfo:null,
           locationDetails:null,
           cityId:1,
           stay:[],
           editData:[],
           cities:[],
           staytypes:[],
           staytypenames:[]
           
       }
    }
   async componentDidMount()
     {
    
        let staydata= await loadData(getstays)
        this.setState({
           stay:staydata
        })

        let data= await loadData(getcities)
        this.setState({
           cities:data
        })

        let staytype= await loadData(getstaytypes)
        this.setState({
           staytypes:staytype
        })


     }  
     staynameOperation(event)
    {
      this.setState({
            stayName:event.target.value
        })
    }
    ratetypeOperation(event)
    {
   this.setState({
            rateType:event.target.value
        })

    }
    staytypeOperation(event)
    {
  this.setState({
            stayType:event.target.value
        })
    }
    contactinfoOperation(event)
    {
  this.setState({
            contactInfo:event.target.value
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
   
    
    async editReacord(id)
    { 
        debugger
        
        let url=getstaybyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

        let staytypeids=(editdata.stayTypeIds).split(",");
    var staytypenames1=[]

    staytypeids.map(obj=>
        this.state.staytypes.map((item)=>{
            if(parseInt(obj) == item.stayTypeId)
            {
              staytypenames1.push({stayTypeName:item.stayTypeName,stayTypeId:item.stayTypeId}); //reusability
            }
        }))
console.log("stays",staytypenames1)
        this.setState({
            staytypenames:staytypenames1
        })
        this.setState({
            stayName:editdata.stayName,
            rateType:editdata.rateType,
            stayTypeIds:editdata.stayTypeIds,
            contactInfo:editdata.contactInfo,
            locationDetails:editdata.locationDetails
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
            stayId:parseInt(this.state.editData.stayId),
            stayName:this.state.stayName,
            rateType:this.state.rateType,
            stayTypeIds:this.state.StayTypeIds,
            contactInfo:this.state.contactInfo,
            locationDetails:this.state.locationDetails,
            cityId:parseInt(this.state.cityId)
           }

        let editurl=stayupdateapi+this.state.editData.stayId;
        let editeddata=await postData(obj,editurl,'Put')
        alert(editeddata)
        window.location.reload();//page refresh

    }
    async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            stayId: 0,
            stayName:this.state.stayName,
            rateType:this.state.rateType,
            stayTypeIds:this.state.StayTypeIds,
            contactInfo:this.state.locationDetails,
            locationDetails:this.state.locationDetails,
            cityId:parseInt(this.state.cityId)
              }
             let message = await  postData(obj,staypostapi,'Post');
             alert (message);
             window.location.reload();//page refresh
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
            if(this.state.editData.stayId == undefined)
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
            staytypenames:[]
            })
    }
    handlemultiselect(e)
    {
        debugger
        let data= Array.prototype.map.call(e, function(item) { return item.stayTypeId; }).join(",");
       this.setState({
           StayTypeIds:data
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
                            </span> StayInfo
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    StayInfo
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">StayInfo</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">StayName</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.stayName}  class="form-control"  onChange={(e)=>this.staynameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">RateType</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.rateType} class="form-control" onChange={(e)=>this.ratetypeOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                           
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">StayTypeIds</label>
                                                    <div class="col-sm-9">
                                                    <Multiselect selectedValues={this.state.staytypenames}  options={this.state.staytypes} displayValue={"stayTypeName"} class="form-control" onSelect={(e)=>this.handlemultiselect(e)} onRemove={(e)=>this.handlemultiselect(e)} /> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">ContactInfo</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.contactInfo}  class="form-control"  onChange={(e)=>this.contactinfoOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Location Details</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.locationDetails}   class="form-control"  onChange={(e)=>this.locationdetailsOperation(e)}/>
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
                                    Header: "Name",
                                    accessor: "stayName"
                                    
                                  },
                                  {
                                    Header: "RateType",
                                    accessor: "rateType"
                                    
                                  },
                                  {
                                    Header: "StayType",
                                    accessor: "stayType"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.stayId,
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
                                data={this.state.stay}
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
    export default Stay

