import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,loadData,eventtypepostapi,eventtypeupdateapi,getstatusapi,geteventtypebyid,geteventtypes} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser'

/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import { act } from 'react-dom/test-utils';
/* import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js' */



var condition=false;
class EventType extends Component {
    constructor(props) {
        super(props);
       this.state = {
        eventTypeCode:null,
        eventTypeDesc:null,
        statusId: 1,
        editData:[],
        eventtypes:[],
        status:[],
        
           }
    }

   /*  async loadtabledata()
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
        let eventtype= await loadData(geteventtypes)
        this.setState({
            eventtypes:eventtype
        })
        let status1= await loadData(getstatusapi)
        this.setState({
            status:status1
        })
       
     } 
    eventtypecodeOperation(event)
    {
      this.setState({
            eventTypeCode:event.target.value
        })
    }
    eventtypedescriptionOpearation(event)
    {
        this.setState({
            eventTypeDesc:event.target.value
        })

    }
    statusidOpearation(event)
    {
        this.setState({
            statusId:event.target.value
        })

    }

   /*  deleteRecord(id)
    {
        alert("in delete id no is"+id)
        fetch(deletecountry+id, {
            method: 'DELETE'
          });

    } */
    async editReacord(id)
    {
        
        let url=geteventtypebyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

        this.setState({
            eventTypeCode:editdata.eventTypeCode,
            eventTypeDesc:editdata.eventTypeDesc,
            statusId:editdata.statusId
            
             })
    } 
     async postEditedData()
    {
        debugger
        
        const obj={
            eventTypeId:parseInt(this.state.editData.eventTypeId),
            eventTypeCode:this.state.eventTypeCode,
            eventTypeDesc:this.state.eventTypeDesc,
            statusId:parseInt(this.state.statusId)
                  }

        let editurl=eventtypeupdateapi+this.state.editData.eventTypeId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    }
     async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            eventTypeId: 0,
            eventTypeCode:this.state.eventTypeCode,
            eventTypeDesc:this.state.eventTypeDesc,
            statusId:parseInt(this.state.statusId)
              }
             let message=await  postData(obj,eventtypepostapi,'Post');
             
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
            if(this.state.editData.eventTypeId == undefined)
            {
              this.postDatatoApi()
            }
            else
            {
                this.postEditedData()
            }
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
             
        <div class="container-fluid page-body-wrapper" style={{paddingTop:80}}>
            <Sidebar/>
            
            <div class="main-panel">
                <div class="content-wrapper">
                    
                     <div class="page-header">
                        <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                <i class="mdi mdi-wan"></i>
                            </span>EventType
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                EventType
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">EventType</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Code</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.eventTypeCode}  class="form-control" onChange={(e)=>this.eventtypecodeOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.eventTypeDesc} class="form-control" onChange={(e)=>this.eventtypedescriptionOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Status</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.statusidOpearation(e)}>
                                                       {this.state.status.map(obj=>
                                                      <option value={obj.statusId}>{obj.statusCode}</option>
                                                        )}
                                                    </select>
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
                                    <h4 class="card-title">EventTypes</h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                    
                                  {
                                    Header: "Code",
                                    accessor: "eventTypeCode"
                                    
                                  },
                                  {
                                    Header: "Description",
                                    accessor: "eventTypeDesc"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.eventTypeId,
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
                                data={this.state.eventtypes}
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
    export default EventType

