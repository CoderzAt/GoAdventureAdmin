import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {GET_STAYTYPE,GET_STAYTYPE_BYID,POST_STAYTYPE,PUT_STAYTYPE} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'


class StayType extends Component {
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
     this.props.getData(action.GET_STAYTYPE,GET_STAYTYPE)
     }  
    postStaytypedata()
    {
        debugger
    const obj = {
            stayTypeId:this.props.getstaytypebyid.stayTypeId?this.props.getstaytypebyid.stayTypeId:0,
            stayTypeName:this.props.getstaytypebyid.stayTypeName,
            stayTypeDescription:this.props.getstaytypebyid.stayTypeDescription,
            maxCapacity:this.props.getstaytypebyid.maxCapacity*1,
            isDeleted: this.props.getstaytypebyid.stayTypeId?false:true
     };
    let url = PUT_STAYTYPE+ this.props.getstaytypebyid.stayTypeId;
    if (this.props.getstaytypebyid.stayTypeId) {
        this.props.putData1(action.PUT_STAYTYPE,url,obj);
    }
    else {
        this.props.postData1(action.POST_STAYTYPE,POST_STAYTYPE,obj);
    }
    this.setState({ validated: false });
    }
     handleSubmit(event)
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
            this.postStaytypedata();
        }   
    } 
 handleReset()
    {
        this.props.resetData(action.RESET_DATA,"getstaytypebyid");
        this.setState({ validated: false });
    } 
    editReacord(id) {
        this.props.getData(action.GET_STAYTYPE_BYID, GET_STAYTYPE_BYID+id)
    }

    updateStaytype = (e, paramName) => {
        this.props.updatePropAccData(paramName,e.target.value,"getstaytypebyid");
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
                            </span> Staytype
                        </h3>
                        {this.props.message ?
                                    <div className={`message-wrapper ${this.props.messageData.isSuccess ? "success" : "error"}`}>{this.props.messageData.message}</div> :
                                    null
                        }
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
                                                        <input required type="text" value={this.props.getstaytypebyid.stayTypeName?this.props.getstaytypebyid.stayTypeName:""} 
                                                        class="form-control" onChange={(e)=>this.updateStaytype(e,"stayTypeName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">StayType Description</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getstaytypebyid.stayTypeDescription?this.props.getstaytypebyid.stayTypeDescription:""} 
                                                         class="form-control"  onChange={(e)=>this.updateStaytype(e,"stayTypeDescription")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">MaxCapacity</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.getstaytypebyid.maxCapacity?this.props.getstaytypebyid.maxCapacity:""}  
                                                        class="form-control"  onChange={(e)=>this.updateStaytype(e,"maxCapacity")}/>
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
                                    accessor: "stayTypeName",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                
                                 },
                                  {
                                    Header: "Description",
                                    accessor: "stayTypeDescription",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Capacity",
                                    accessor: "maxCapacity",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
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
                                data={this.props.getstaytype}
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
         getstaytypebyid:state.goAdvStore.getstaytypebyid,
         getstaytype:state.goAdvStore.getstaytype,
          message: state.goAdvStore.message,
          messageData: state.goAdvStore.messageData
          
        }
      }
      export default connect(mapStateToProps, { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg })(StayType)
    //export default StayType

