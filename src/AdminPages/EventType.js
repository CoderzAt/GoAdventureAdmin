import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,loadData,eventtypepostapi,eventtypeupdateapi,getstatusapi,geteventtypebyid,geteventtypes,GET_EVENTTYPE,GET_EVENTTYPE_BYID,POST_EVENTTYPE,PUT_EVENTTYPE,GET_STATUS,DELETE_EVENTTYPE} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import {getData,postData1,putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'


class EventType extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           refreshflag:false
           }
    }
    componentWillMount()
    {
      this.props.removeErrormsg()
    }
   componentDidMount()
     {
       this.props.getData(action.GET_EVENTTYPE,GET_EVENTTYPE)
       this.props.getData(action.GET_STATUS,GET_STATUS)
    } 
    refresh(e)
    {
        e.preventDefault();
        this.props.getData(action.GET_EVENTTYPE,GET_EVENTTYPE)
    }
  
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_EVENTTYPE,DELETE_EVENTTYPE+id)
    }
    postEventtypeData()
    {
        debugger
        const obj = {
            eventTypeId:this.props.geteventtypebyid.eventTypeId?this.props.geteventtypebyid.eventTypeId:0,
            eventTypeCode:this.props.geteventtypebyid.eventTypeCode,
            eventTypeDesc:this.props.geteventtypebyid.eventTypeDesc,
            statusId:this.props.geteventtypebyid.statusId*1,
            isDeleted: this.props.geteventtypebyid.eventTypeId?false:true
        };
        let url = PUT_EVENTTYPE + this.props.geteventtypebyid.eventTypeId;
        if (this.props.geteventtypebyid.eventTypeId) {
            this.props.putData1(action.PUT_EVENTTYPE, url, obj);
        }
        else {
            this.props.postData1(action.POST_EVENTTYPE, POST_EVENTTYPE, obj);
        }
        this.setState({ validated: false });
    }

    async handleSubmit(event)
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
            this.postEventtypeData();
        }   
    }

    handleReset() {
        this.props.resetData(action.RESET_DATA,"geteventtypebyid");
        this.setState({ validated: false });
    }
    editReacord(id) {
        this.props.getData(action.GET_EVENTTYPE_BYID, GET_EVENTTYPE_BYID+id)
    }
    updateEventtype = (e, paramName) => {
        this.props.updatePropAccData(paramName, e.target.value,"geteventtypebyid");
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
                            </span>EventType
                        </h3>
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>
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
                                                        <input required type="text" value={this.props.geteventtypebyid.eventTypeCode?this.props.geteventtypebyid.eventTypeCode:""}  
                                                        class="form-control" onChange={(e)=>this.updateEventtype(e,"eventTypeCode")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.geteventtypebyid.eventTypeDesc?this.props.geteventtypebyid.eventTypeDesc:""} 
                                                        class="form-control" onChange={(e)=>this.updateEventtype(e,"eventTypeDesc")} />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Status</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.geteventtypebyid.statusId?this.props.geteventtypebyid.statusId:"0"} 
                                                    onChange={(e)=>this.updateEventtype(e,"statusId")}>
                                                        <option value={0}>Select</option>
                                                       {this.props.getstatus.map(obj=>
                                                      <option value={obj.statusId}>{obj.statusCode}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div> */}
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
                                    <h4 class="card-title">Event Types<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                    
                                  {
                                    Header: "Code",
                                    accessor: "eventTypeCode",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Description",
                                    accessor: "eventTypeDesc",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
                                    accessor: d => d.eventTypeId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          
                                      </div>)

                                  }

                                ]}
                                data={this.props.geteventtype}
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
           geteventtype:state.goAdvStore.geteventtype,
           geteventtypebyid:state.goAdvStore.geteventtypebyid,
           getstatus:state.goAdvStore.getstatus,
           message: state.goAdvStore.message,
           messageData: state.goAdvStore.messageData
           }
    }
    
    export default connect(mapStateToProps, {getData,postData1,putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord})(EventType);

    //export default EventType

