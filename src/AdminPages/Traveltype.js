import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,traveltypepostapi,loadData,traveltypegetapi,traveltypebyid,travelupdateapi} from '../Shared/Services'
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
class Traveltype extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           name:null,
           description:null,
           maxCapacity:null,
           traveltypes:[],
           editData:[]
           
       }
    }

  /*   async loadtabledata()
    {

        let countries1=await loadData(getcounties);
        this.setState({
                countries:countries1
            }
        )
    } */
 /* componentDidUpdate() //this is for rendering the code for every update
    {
        debugger
        //we need to keep a condition here ...if new data is submitted then only we have to call this function
       
        this.loadtabledata()  //is there any problem with hitting the api's too many times
        condition=false;
        
     } */
      async componentDidMount()
     {
    
        let data= await loadData(traveltypegetapi)
        this.setState({
           traveltypes:data
        })
     } 
    nameOperation(event)
    {
      this.setState({
            name:event.target.value
        })
    }
    descriptionOperation(event)
    {
   this.setState({
            description:event.target.value
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
        
        let url=traveltypebyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

        this.setState({
           name:editdata.travelTypeName,
           description:editdata.travelTypeDescription,
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
            travelTypeId:parseInt(this.state.editData.travelTypeId),
            travelTypeName:this.state.name,
            travelTypeDescription:this.state.description,
            maxCapacity:parseInt(this.state.maxCapacity)
                  }

        let editurl=travelupdateapi+this.state.editData.travelTypeId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    }
 async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            travelTypeId: 0,
            travelTypeName:this.state.name,
            travelTypeDescription:this.state.description,
            maxCapacity:parseInt(this.state.maxCapacity)
              }
             let message=await  postData(obj,traveltypepostapi,'Post');
             
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
            if(this.state.editData.travelTypeId == undefined)
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
                            </span> Traveltype
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Traveltype
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Traveltype</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.travelTypeName} class="form-control" onChange={(e)=>this.nameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea required rows="4" defaultValue={this.state.editData.travelTypeDescription}  class="form-control" onChange={(e)=>this.descriptionOperation(e)}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">MaxCapacity</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.maxCapacity}  class="form-control"  onChange={(e)=>this.maxCapacityOperation(e)}/>
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
                                    <h4 class="card-title">List</h4>
                                    <div class="table-responsive"></div>
                                     <ReactTable columns={[
                                   
                                  {
                                    Header: "Name",
                                    accessor: "travelTypeName"
                                    
                                  },
                                  {
                                    Header: "Description",
                                    accessor: "travelTypeDescription"
                                    
                                  },
                                  {
                                    Header: "MaxCapacity",
                                    accessor: "maxCapacity"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.travelTypeId,
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
                                data={this.state.traveltypes}
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
    export default Traveltype

