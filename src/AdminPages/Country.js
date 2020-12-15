import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,countrypostapi,getcounties,loadData,deletecountry,getcountrybyid,countryupdateapi,GET_COUNTRIES,GET_COUNTRY_BYID} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
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

import { connect } from 'react-redux';
import {getData} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
/* import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js' */



var condition=false;
class Country extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           countryname:null,
           countrydescription:'<div>hi<div>',
           countrycode:null,
           countries:[],
           viewData:[],
           editorState:EditorState.createEmpty()
           
           
       }
    }

    async loadtabledata()
    {
       
        let countries1=await loadData(getcounties);
        this.setState({
                countries:countries1
            }
        )
    }
 /* componentDidUpdate() //this is for rendering the code for every update
    {
        debugger
        //we need to keep a condition here ...if new data is submitted then only we have to call this function
       
        this.loadtabledata()  //is there any problem with hitting the api's too many times
        condition=false;
        
     } */
     componentDidMount()
     {

        this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)
        /* this.loadtabledata() */
     }
    countrynamenameOperation(event)
    {
      this.setState({
            countryname:event.target.value
        })
    }
    countrydescriptionOperation(event)
    {
        //alert(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        
   this.setState({
            countrydescription:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })

    }
    onEditorStateChange = (editorState) => {
    this.setState({
          editorState,
        });
      } 
    countrycodeOpearation(event)
    {
  this.setState({
            countrycode:event.target.value
        })
    }
    deleteRecord(id)
    {
        alert("in delete id no is"+id)
        fetch(deletecountry+id, {
            method: 'DELETE'
          });

    }
  async editReacord(id)
    {
        
        let url=getcountrybyid+id;
        let editdata=await loadData(url)

       // this.props.getData(action.GET_COUNTRY_BYID,);
        



        this.setState({
            viewData:editdata
        })

        this.setState({
            countryname:editdata.countryName,
            countrycode:editdata.countryCode,
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(editdata.countryDesc)
                )
              )
        })
    }
    async postEditedData()
    {
        debugger
        
        const obj={
            countryId:this.state.viewData.countryId,
            countryName:this.state.countryname,
            countryCode:this.state.countrycode,
            countryDesc:this.state.countrydescription,
                  }

        let editurl=countryupdateapi+this.state.viewData.countryId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    }
    async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
        countryId: 0,
        countryName:this.state.countryname,
        countryCode:this.state.countrycode,
        countryDesc:this.state.countrydescription,
              }
             let message=await  postData(obj,countrypostapi,'Post');
             
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
            if(this.state.viewData.countryId == undefined)
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
            viewData:[],
            editorState:EditorState.createEmpty()
        })
    }

    handleinput(e)
    {
       alert(e.target.value)
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
                            </span> Country
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Country
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Country</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                        {/* <TextInput value={this.state.countryname} defaultValue={this.state.viewData.countryName} type="text" name="countryName" onChange={(e)=>this.countrynamenameOperation(e)}/>
                                        <TextInput value={this.state.country} defaultValue={this.state.viewData.countryCode} type="text" name="countryCode" onChange={(value)=>this.countrycodeOpearation(value)}/>
                                            */}
                                          
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.viewData.countryName} class="form-control" onChange={(e)=>this.countrynamenameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Code</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.viewData.countryCode} class="form-control" onChange={(e)=>this.countrycodeOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-12">
                                                    <div>
                                                       
                                                       {/*  <textarea required defaultValue={this.state.viewData.countryDesc} class="form-control" id="placeTypeDescription" rows="4" onChange={(e)=>this.countrydescriptionOperation(e)}></textarea> */}
                                                       <Editor
                                                 editorState={this.state.editorState}
                                                 wrapperClassName="demo-wrapper"
                                                 editorClassName="demo-editor"
                                                 onEditorStateChange={this.onEditorStateChange}
                                                 onChange={(e)=>this.countrydescriptionOperation(e)}
                                                      />
                                                      
                                                      </div>
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
                                    <h4 class="card-title">Countries</h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                    {
                                        Header: "CountryId",
                                        accessor:"countryId",
                                        headerStyle:{
                                            textAlign:'left'
                                        }
                                    },
                                  {
                                    Header: "CountryName",
                                    accessor: "countryName",
                                    headerStyle:{
                                        textAlign:'left'
                                    },
                                  },
                                  {
                                    Header: "CountryCode",
                                    accessor: "countryCode",
                                    headerStyle:{
                                        textAlign:'left'
                                    }
                                    
                                  },
                                  {
                                    Header: "CountryDescription",
                                    accessor: "countryDesc",
                                    headerStyle:{
                                        textAlign:'left'
                                    }
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    headerStyle:{
                                        textAlign:'left'
                                    },
                                    accessor: d => d.countryId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => {  this.deleteRecord(row.value)}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" value={row.value} >
                                          <Link style={{ color:'#A9A9A9'}}  to={`/admin/state/${row.value}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                          </button>
                                      </div>)

                                  }

                                ]}
                                data={this.props.countries}
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
            countries: state.goAdvStore.countries
        }
    }
    export default connect(mapStateToProps, {getData})(Country);
    

    //export default Country

