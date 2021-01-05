import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {GET_ACTIVITIES,GET_PLACEACTIVITIES_BYID,GET_PLACEACTIVITIES,POST_PLACEACTIVITIES,PUT_PLACEACTIVITIES,DELETE_PLACEACTITIES, GET_PLACETOVISIT} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import {getData,putData1,postData1,resetData,updatePropAccData,removeErrormsg,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'



var condition=false;
class PlaceActivities extends Component {
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
        this.props.getData(action.GET_PLACEACTIVITIES,GET_PLACEACTIVITIES)
        this.props.getData(action.GET_AVCTIVITIES,GET_ACTIVITIES)
        this.props.getData(action.GET_PLACETOVISIT,GET_PLACETOVISIT)
     }
     refresh(e)
     {
         e.preventDefault();
         this.props.getData(action.GET_PLACEACTIVITIES,GET_PLACEACTIVITIES)
     }
     
    postPlaceactivitiesdata()
    {
        debugger
        const obj = {
            placeActivityId:this.props.getplaceactivitiesbyid.placeActivityId?this.props.getplaceactivitiesbyid.placeActivityId:0,
            placeId:this.props.getplaceactivitiesbyid.placeId*1,
            activityId:this.props.getplaceactivitiesbyid.activityId*1,
            isDeleted:this.props.getplaceactivitiesbyid.placeActivityId?false:true
        };
        let url = PUT_PLACEACTIVITIES +this.props.getplaceactivitiesbyid.placeActivityId;
        if (this.props.getplaceactivitiesbyid.placeActivityId) {
            this.props.putData1(action.PUT_PLACEACTIVITIES, url, obj);
        } else {
            this.props.postData1(action.POST_PLACEACTIVITIES,POST_PLACEACTIVITIES,obj);
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
        } else {
            event.preventDefault();
            this.postPlaceactivitiesdata();
        }

    }
    editReacord(id) {
        let url=GET_PLACEACTIVITIES_BYID+id;
      this.props.getData(action.GET_PLACEACTIVITIES_BYID, url)
      this.setState({validated:false})
      }
   handleReset() {
        this.props.resetData(action.RESET_DATA,"getplaceactivitiesbyid");
        this.setState({ validated: false });
      }
updateActivity = (e, paramName) => {
    debugger
    this.props.updatePropAccData(paramName, e.target.value,"getplaceactivitiesbyid");
    this.setState({refreshflag: !this.state.refreshflag});
  }
  deleteRecord(id)
  {
      debugger
  this.props.deleteRecord(action.DELETE_PLACEACTITIES,DELETE_PLACEACTITIES+id)
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
                            </span>PlaceActivities
                        </h3>
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>

                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    PlaceActivities
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">PlaceActivities</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">PlaceId</label>
                                                    <div class="col-sm-9">
                                                        <select required type="text" value={this.props.getplaceactivitiesbyid.placeId?this.props.getplaceactivitiesbyid.placeId:"0"}  
                                                        class="form-control" onChange={(e)=>this.updateActivity(e,"placeId")}>
                                                            <option value={0}>Select</option>
                                                            {this.props.getplcetovisit.map(obj=>
                                                            <option value={obj.placeId}>{obj.placeName}</option>
                                                                )}
                                                            </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Activity</label>
                                                    <div class="col-sm-9">
                                                        <select required type="text" value={this.props.getplaceactivitiesbyid.activityId?this.props.getplaceactivitiesbyid.activityId:"0"} 
                                                        class="form-control" onChange={(e)=>this.updateActivity(e,"activityId")} >
                                                            <option value={0}>Select</option>
                                                            {this.props.activities.map(obj=>(
                                                                <option value={obj.activityId}>{obj.activityName}</option>
                                                            ))}
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
                                    <h4 class="card-title">Activities<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                    
                                  {
                                    Header: "PlaceId",
                                    accessor: "placeId",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "ActivityId",
                                    accessor: "activityId",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
                                    accessor: d => d.placeActivityId,
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
                                data={this.props.getplaceactivities}
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
           getplcetovisit:state.goAdvStore.getplcetovisit,
           getplaceactivities:state.goAdvStore.getplaceactivities,
           getplaceactivitiesbyid:state.goAdvStore.getplaceactivitiesbyid,
           postplaceactivities:state.goAdvStore.postplaceactivities,
           putplaceactivities:state.goAdvStore.putplaceactivities,
           message: state.goAdvStore.message,
           messageData: state.goAdvStore.messageData
         }
    }
    export default connect(mapStateToProps, {getData,postData1,putData1,resetData,updatePropAccData,removeErrormsg,deleteRecord})(PlaceActivities);
    

   // export default Activity

