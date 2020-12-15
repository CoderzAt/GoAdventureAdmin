import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,staytypepostapi,staytypeupdateapi,getstaytypes,staytypebyid} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'

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
class StayType extends Component {
    constructor(props) {
        super(props);
       this.state = {
        stayTypeName:null,
        stayTypeDescription:null,
        maxCapacity:0,
        editData:[],
        staytypes:[]
         }
    }
    async componentDidMount()
     {
    
        let data= await loadData(getstaytypes)
        this.setState({
           staytypes:data
        })
     }  
     staytypenameOperation(event)
    {
      this.setState({
            stayTypeName:event.target.value
        })
    }
    staytypeDescriptionOperation(event)
    {
   this.setState({
            stayTypeDescription:event.target.value
        })
    }
    maxCapacityOperation(event)
    {
  this.setState({
            maxCapacity:event.target.value
        })
    }
   
    
     async editReacord(id)
    {
        
        debugger

        let url=staytypebyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata       
        })

        this.setState({
            stayTypeName:editdata.stayTypeName,
            stayTypeDescription:editdata.stayTypeDescription,
            maxCapacity:editdata.maxCapacity
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
            stayTypeId:this.state.editData.stayTypeId,
            stayTypeName:this.state.stayTypeName,
            stayTypeDescription:this.state.stayTypeDescription,
            maxCapacity:parseInt(this.state.maxCapacity)
                  }

        let editurl=staytypeupdateapi+this.state.editData.stayTypeId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    } 
     async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            stayTypeName:this.state.stayTypeName,
            stayTypeDescription:this.state.stayTypeDescription,
            maxCapacity:parseInt(this.state.maxCapacity)
              }
             let message = await  postData(obj,staytypepostapi,'Post');
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
            if(this.state.editData.stayTypeId == undefined)
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
                            </span> Staytype
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i>index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Staytype
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Staytype</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">StayType Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.stayTypeName} class="form-control" onChange={(e)=>this.staytypenameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">StayType Description</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.stayTypeDescription}  class="form-control"  onChange={(e)=>this.staytypeDescriptionOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">MaxCapacity</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.maxCapacity}  class="form-control"  onChange={(e)=>this.maxCapacityOperation(e)}/>
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
                                    accessor: "stayTypeName",
                                
                                 },
                                  {
                                    Header: "Description",
                                    accessor: "stayTypeDescription"
                                    
                                  },
                                  {
                                    Header: "MaxCapacity",
                                    accessor: "maxCapacity"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.stayTypeId,
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
                                data={this.state.staytypes}
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
    export default StayType

