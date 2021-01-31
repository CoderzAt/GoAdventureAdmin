import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {GET_TRAVELTYPE_BYID,GET_TRAVELTYPE,POST_TRAVELTYPE,PUT_TRAVELTYPE,DELETE_TRAVELTYPE} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg ,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'





var condition=false;
class Traveltype extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
          refreshflag:false
           
       }
    }
    componentWillMount()
    {
        debugger
      this.props.removeErrormsg()
  
    }
  
    componentDidMount()
     {
    this.props.getData(action.GET_TRAVELTYPE,GET_TRAVELTYPE)
    } 
    refresh(e)
    {
        e.preventDefault();
        this.props.getData(action.GET_TRAVELTYPE,GET_TRAVELTYPE)
    }
 
    postTraveltypeData()
    {
        debugger
    const obj = {
        travelTypeId:this.props.gettraveltypebyid.travelTypeId?this.props.gettraveltypebyid.travelTypeId:0,
        travelTypeName:this.props.gettraveltypebyid.travelTypeName,
        travelTypeDescription:this.props.gettraveltypebyid.travelTypeDescription,
        maxCapacity:this.props.gettraveltypebyid.maxCapacity*1,
        isDeleted: this.props.gettraveltypebyid.travelTypeId ? false : true
        };
    let url = PUT_TRAVELTYPE+ this.props.gettraveltypebyid.travelTypeId;
    if (this.props.gettraveltypebyid.travelTypeId) {
        this.props.putData1(action.PUT_TRAVELTYPE,url,obj);
    }
    else {
        this.props.postData1(action.POST_TRAVELTYPE,POST_TRAVELTYPE,obj);
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
        this.postTraveltypeData();
    }   
  } 
 
    handleReset() {
        this.props.resetData(action.RESET_DATA,"gettraveltypebyid");
            this.setState({ validated: false });
      }
    editReacord(id) {
        this.props.getData(action.GET_TRAVELTYPE_BYID, GET_TRAVELTYPE_BYID+id)
    }

    updateTraveltype = (e, paramName) => {
        this.props.updatePropAccData(paramName,e.target.value,"gettraveltypebyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_TRAVELTYPE,DELETE_TRAVELTYPE+id)
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
                            </span> Traveltype
                        </h3>
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>
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
                                                        <input required type="text" value={this.props.gettraveltypebyid.travelTypeName?this.props.gettraveltypebyid.travelTypeName:""} 
                                                        class="form-control" onChange={(e)=>this.updateTraveltype(e,"travelTypeName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea required rows="4" value={this.props.gettraveltypebyid.travelTypeDescription?this.props.gettraveltypebyid.travelTypeDescription:""}  
                                                        class="form-control" onChange={(e)=>this.updateTraveltype(e,"travelTypeDescription")}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">MaxCapacity</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.gettraveltypebyid.maxCapacity?this.props.gettraveltypebyid.maxCapacity:""}  
                                                        class="form-control"   onChange={(e)=>this.updateTraveltype(e,"maxCapacity")}/>
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
                                    <h4 class="card-title">List<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                    <div class="table-responsive"></div>
                                     <ReactTable columns={[
                                   
                                  {
                                    Header: "Name",
                                    accessor: "travelTypeName",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Description",
                                    accessor: "travelTypeDescription",
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
                                    accessor: d => d.travelTypeId,
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
                                data={this.props.gettraveltype}
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
            gettraveltypebyid:state.goAdvStore.gettraveltypebyid,
            gettraveltype:state.goAdvStore.gettraveltype,
         message: state.goAdvStore.message,
          messageData: state.goAdvStore.messageData
        }
      }
      export default connect(mapStateToProps, { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg ,deleteRecord})(Traveltype);
    
    //export default Traveltype

