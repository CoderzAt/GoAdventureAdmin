import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {GET_ACTIVITY_BYID,GET_USER_BYID,GET_ACTIVITIES,PUT_ACTIVITY,POST_ACTIVITY,DELETE_ACTIVITY} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import {getActivity,getData,putData1,removedata,postData1,resetData,updatePropAccData,removeErrormsg,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'

var condition=false;
class Activity extends Component {
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
      this.props.removedata("getactivitybyid")
   }
      componentDidMount()
     {
        this.props.getActivity()
        this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))
     }
     refresh(e)
     {
         e.preventDefault();
         this.props.getActivity()
     }
     postActivityData() 
     {
        debugger
        const obj = {
            activityId:this.props.getactivitybyid.activityId?this.props.getactivitybyid.activityId:0,
            activityName:this.props.getactivitybyid.activityName,
            activityGenre:this.props.getactivitybyid.activityGenre,
            createdBy:this.props.getactivitybyid.activityId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName,
            modifiedBy:this.props.getactivitybyid.activityId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null,
            isDeleted:this.props.getactivitybyid.activityId?false:true
        };
        let url = PUT_ACTIVITY +this.props.getactivitybyid.activityId;
        if (this.props.getactivitybyid.activityId) {
            this.props.putData1(action.PUT_ACTIVITY, url, obj);
        } else {
            this.props.postData1(action.POST_ACTIVITY,POST_ACTIVITY,obj);
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
        } else {
            event.preventDefault();
            this.postActivityData();
        }

    }
    editReacord(id) {
        let url=GET_ACTIVITY_BYID+id;
      this.props.getData(action.GET_ACTIVITY_BYID, url)
      this.setState({validated:false})
      }
   handleReset() {
        this.props.resetData(action.RESET_DATA,"getactivitybyid");
        this.setState({ validated: false });
      }
updateActivity = (e, paramName) => {
    debugger
    this.props.updatePropAccData(paramName, e.target.value,"getactivitybyid");
    this.setState({refreshflag: !this.state.refreshflag});
  }
  deleteRecord(id)
  {
      debugger
  this.props.deleteRecord(action.DELETE_ACTIVITY,DELETE_ACTIVITY+id)
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
                            </span>Activity
                        </h3>
                        
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Activity
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Activity</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getactivitybyid.activityName?this.props.getactivitybyid.activityName:""}  
                                                        class="form-control" onChange={(e)=>this.updateActivity(e,"activityName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Genre</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getactivitybyid.activityGenre?this.props.getactivitybyid.activityGenre:""} 
                                                        class="form-control" onChange={(e)=>this.updateActivity(e,"activityGenre")} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row" style={{margin:"auto",textAlign:"center"/* marg:auto;text-align: center} */}}>
                                            <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                                            <button type="reset" class="btn btn-light">Cancel</button>
                                        </div>
                                        <br/>
                                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>
    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Activities<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                    
                                  {
                                    Header: "Name",
                                    accessor: "activityName",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Genre",
                                    accessor: "activityGenre",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
                                    accessor: d => d.activityId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}}  value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          
                                      </div>)

                                  }

                                ]}
                                data={this.props.activities}
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
            activities: state.goAdvStore.activities,
            getactivitybyid:state.goAdvStore.getactivitybyid,
            message: state.goAdvStore.message,
            messageData: state.goAdvStore.messageData,
            getuserbyidprofile:state.goAdvStore.getuserbyidprofile
         }
    }
    export default connect(mapStateToProps, {getActivity,getData,removedata,postData1,putData1,resetData,updatePropAccData,removeErrormsg,deleteRecord})(Activity);
    

   // export default Activity

