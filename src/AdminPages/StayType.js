import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {GET_STAYTYPE,GET_STAYTYPE_BYID,POST_STAYTYPE,PUT_STAYTYPE,DELETE_STAYTYPE,GET_USER_BYID} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removedata,removeErrormsg ,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'
import Spinner1 from '../Components/Spinner1';


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
      this.props.removedata()
  
    }
    componentDidMount()
     {
     this.props.getData(action.GET_STAYTYPE,GET_STAYTYPE)
     this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))
     }  
     refresh(e)
    {
        e.preventDefault();
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
            createdBy:this.props.getstaytypebyid.stayTypeId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName,
            modifiedBy:this.props.getstaytypebyid.stayTypeId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null,
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
            window.scrollTo({
                top:100,
                behavior: 'smooth',
            })
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
        window.scrollTo({
            top:100,
            behavior: 'smooth',
        })
    }

    updateStaytype = (e, paramName) => {
        this.props.updatePropAccData(paramName,e.target.value,"getstaytypebyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_STAYTYPE,DELETE_STAYTYPE+id)
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
                            <div class="col-12 text-right"><span class="text-danger">*</span> <small class="very-small"> Fields Are Mandatory</small></div>
                                <div class="card-body">
                                    <h4 class="card-title">Staytype</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">StayType Name<span class="text-danger">*</span></label>
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
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">StayType Description<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getstaytypebyid.stayTypeDescription?this.props.getstaytypebyid.stayTypeDescription:""} 
                                                         class="form-control"  onChange={(e)=>this.updateStaytype(e,"stayTypeDescription")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Max Capacity<span class="text-danger">*</span></label>
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
                                        <br/>
                                        {this.props.ispostStaytypeLoading || this.props.isputStaytypeLoading?
                                            <Spinner1/>:
                                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>}
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
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                      </div>)
                                      }
                                ]}
                                data={this.props.getstaytype}
                                showPagination={true}
                                defaultPageSize={25}
                               
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
          getuserbyidprofile:state.goAdvStore.getuserbyidprofile,
          messageData: state.goAdvStore.messageData,
          ispostStaytypeLoading: state.goAdvStore.ispostStaytypeLoading,
          isputStaytypeLoading: state.goAdvStore.isputStaytypeLoading
      
          
        }
      }
      export default connect(mapStateToProps, { getData,removedata,postData1, putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord })(StayType)
    //export default StayType

