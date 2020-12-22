import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,loadData,postactivityapi,activitybyid,activityupdateapi,getactivities,GET_ACTIVITY_BYID,GE,GET_ACTIVITIES,PUT_ACTIVITY,POST_ACTIVITY} from '../Shared/Services'
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
import { connect } from 'react-redux';
import {getActivity,getData,putData1,postData1,resetData,updatePropAccData} from '../Adminstore/actions/goAdvActions';
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
class Activity extends Component {
    constructor(props) {
        super(props);
       this.state = {
        activityName:null,
        activityGenre:null,
        editData:[]
        //activities:[]
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
        this.props.getActivity()
     }
    activitynamenameOperation(event)
    {
      this.setState({
            activityName:event.target.value
        })
    }
    activitygenreOpearation(event)
    {
        this.setState({
            activityGenre:event.target.value
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
        
        let url=GET_ACTIVITY_BYID+id;

        this.props.getData(action.GET_ACTIVITY_BYID,url)

        let editdata=this.props.getactivitybyid;
      /*   this.setState({
            editData:editdata
        }) */

        this.setState({
            activityName:editdata.activityName,
            activityGenre:editdata.activityGenre
                    })
    }
     async postEditedData()
    {
        debugger
        
        const obj={
            activityId:this.state.editData.activityId,
            activityName:this.state.activityName,
            activityGenre:this.state.activityGenre,
                  }

        let editurl=PUT_ACTIVITY+this.state.editData.activityId;
        //this.props.putData1(action)
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    }
    async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            activityId:this.props.activitybyid.activityId?this.props.activitybyid.activityId:0,
            activityName:this.props.getactivitybyid.activityName,
            activityGenre:this.props.getactivitybyid.activityGenre
              }
             
     this.props.postData1(action.POST_ACTIVITY,POST_ACTIVITY,obj)
            /*  let message=await  postData(obj,postactivityapi,'Post');
             
             alert (message); */
             //window.location.reload();//page refresh
    }

    postActivityData() {
        debugger
        const obj = {
            activityId:this.props.getactivitybyid.activityId?this.props.getactivitybyid.activityId:0,
            activityName:this.props.getactivitybyid.activityName,
            activityGenre:this.props.getactivitybyid.activityGenre
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
                        {this.props.message?
                        <div className={`message-wrapper ${this.props.messageData.isSuccess? "success":"error"}`}>{this.props.messageData.message}</div> :
                        null
                        }
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
    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Activities</h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                    
                                  {
                                    Header: "Name",
                                    accessor: "activityName"
                                    
                                  },
                                  {
                                    Header: "Genre",
                                    accessor: "activityGenre"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.activityId,
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
                                data={this.props.activities}
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
            activities: state.goAdvStore.activities,
            getactivitybyid:state.goAdvStore.getactivitybyid,
            message: state.goAdvStore.message,
            messageData: state.goAdvStore.messageData
         }
    }
    export default connect(mapStateToProps, {getActivity,getData,postData1,putData1,resetData,updatePropAccData})(Activity);
    

   // export default Activity

