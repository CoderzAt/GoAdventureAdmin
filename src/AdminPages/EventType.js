import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,loadData,eventtypepostapi,eventtypeupdateapi,getstatusapi,geteventtypebyid,geteventtypes,GET_EVENTTYPE,GET_EVENTTYPE_BYID,POST_EVENTTYPE,PUT_EVENTTYPE,GET_STATUS} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import {getCities,getData,postData1,putData1,updatePropAccData,resetData} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'

class EventType extends Component {
    constructor(props) {
        super(props);
       this.state = {
        eventTypeCode:null,
        eventTypeDesc:null,
        statusId: 1,
       // editData:[],
       // eventtypes:[],
        //status:[],
        
           }
    }

   
    componentDidMount()
     {
       this.props.getData(action.GET_EVENTTYPE,GET_EVENTTYPE)
       this.props.getData(action.GET_STATUS,GET_STATUS)
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
        
        let url=GET_EVENTTYPE_BYID+id;

        this.props.getData(action.GET_EVENTTYPE_BYID,url)
        let editdata=this.props.geteventtypebyid;
      /*   let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })
 */
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
    postEventtypeData()
    {
        debugger
        const obj = {
            eventTypeId:this.props.geteventtypebyid.eventTypeId?this.props.geteventtypebyid.eventTypeId:0,
            eventTypeCode:this.props.geteventtypebyid.eventTypeCode,
            eventTypeDesc:this.props.geteventtypebyid.eventTypeDesc,
            statusId:this.props.geteventtypebyid.statusId*1
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
                        {this.props.message ?
                                    <div className={`message-wrapper ${this.props.messageData.isSuccess ? "success" : "error"}`}>{this.props.messageData.message}</div> :
                                    null
                        }
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
                                            <div class="col-md-6">
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
           
            //cities:state.goAdvStore.citybyid
            //cities:state.goAdvStore.citybyid
        }
    }
    
    export default connect(mapStateToProps, {getData,postData1,putData1,updatePropAccData,resetData})(EventType);

    //export default EventType

