import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,loadData,getallcostcentreapi,getcostcentrebyid,costcentreupdteapi,costcentrepostapi} from '../Shared/Services'
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
import { EditorState, convertToRaw ,ContentState, convertFromHTML} from 'draft-js';
import TextInput from'../Shared/TextInput';
/* import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js' */
var condition=false;
class Costcentre extends Component {
    constructor(props) {
        super(props);
       this.state = {
       costCenterName:null,
       costCenterType:null,
       costCenterTypeDescription:null,
       costCenterSubType:null,
       maxPersonsAllowed:null,
        costcentre:[],
        editData:[],
      }
    }
 
 /* componentDidUpdate() //this is for rendering the code for every update
    {
        debugger
        //we need to keep a condition here ...if new data is submitted then only we have to call this function
       
        this.loadtabledata()  //is there any problem with hitting the api's too many times
        condition=false;
        
     } */
     async componentDidMount()
     {
        this.setState({
            costcentre:await loadData(getallcostcentreapi)
        })
     } 
    costcentrenameOperation(event)
    {
      this.setState({
            costCenterName:event.target.value
        })
    }
   costcentretypeOpearation(event)
    {
        this.setState({
            costCenterType:event.target.value
        })
    }
   costcentresubtypeOpearation(event)
    {
  this.setState({
            costCenterSubType:event.target.value
        })
    }
    maxpersonsallowedOpearation(event)
    {
  this.setState({
            maxPersonsAllowed:event.target.value
        })
    }
    costcentredescriptionOpearation(event)
    {
  this.setState({
            costCenterTypeDescription:event.target.value
        })
    }

    /* deleteRecord(id)
    {
        alert("in delete id no is"+id)
        fetch(deletecountry+id, {
            method: 'DELETE'
          });

    } */
    async editReacord(id)
    {
        debugger
        alert(id)
        
        let url=getcostcentrebyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })
        this.setState({
            costCenterId:0,
            costCenterName:editdata.costCenterName,
            costCenterType:editdata.costCenterType,
            costCenterTypeDescription:editdata.costCenterTypeDescription,
            costCenterSubType:editdata.costCenterSubType,
            maxPersonsAllowed:editdata.maxPersonsAllowed
            })
        } 
     async postEditedData()
    {
        debugger
        
        const obj={
            costCenterId:this.state.editData.costCenterId,
            costCenterName:this.state.costCenterName,
            costCenterType:this.state.costCenterType,
            costCenterTypeDescription:this.state.costCenterTypeDescription,
            costCenterSubType:this.state.costCenterSubType,
            maxPersonsAllowed:this.state.maxPersonsAllowed
            }

        let editurl=costcentreupdteapi+this.state.editData.costCenterId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    }
   async postDatatoApi()
    {
        debugger
        condition=true;
        let st=this.state
        const obj={
            costCenterId:0,
            costCenterName:st.costCenterName,
            costCenterType:st.costCenterType,
            costCenterTypeDescription:st.costCenterTypeDescription,
            costCenterSubType:st.costCenterSubType,
            maxPersonsAllowed:parseInt(st.maxPersonsAllowed)
            }
             let message=await  postData(obj,costcentrepostapi,'Post');
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
            if(this.state.editData.costCenterId == undefined)
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

    handleinput(e)
    {
       alert(e.target.value)
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
                            </span>Costcentre
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                Costcentre
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Costcentre</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                        {/* <TextInput value={this.state.countryname} defaultValue={this.state.viewData.countryName} type="text" name="countryName" onChange={(e)=>this.countrynamenameOperation(e)}/>
                                        <TextInput value={this.state.country} defaultValue={this.state.viewData.countryCode} type="text" name="countryCode" onChange={(value)=>this.countrycodeOpearation(value)}/>
                                            */}
                                          
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  defaultValue={this.state.editData.costCenterName} class="form-control" onChange={(e)=>this.costcentrenameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Type</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.costCenterType}  class="form-control" onChange={(e)=>this.costcentretypeOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">SubType</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.costCenterSubType} class="form-control" onChange={(e)=>this.costcentresubtypeOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">MaxPersonsAllowed</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.state.editData.maxPersonsAllowed} class="form-control" onChange={(e)=>this.maxpersonsallowedOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  defaultValue={this.state.editData.costCenterTypeDescription} class="form-control" onChange={(e)=>this.costcentredescriptionOpearation(e)} />
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
                                    <h4 class="card-title">Accessories</h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                    {
                                        Header: "Name",
                                        accessor:"costCenterName",
                                        headerStyle:{
                                            textAlign:'left'
                                        }
                                    },
                                  {
                                    Header: "Type",
                                    accessor: "costCenterType",
                                    headerStyle:{
                                        textAlign:'left'
                                    },
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    headerStyle:{
                                        textAlign:'left'
                                    },
                                    accessor: d => d.costCenterId,
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
                                data={this.state.costcentre}
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
    export default Costcentre

