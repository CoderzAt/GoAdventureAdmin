import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,countrypostapi,deletecountry,itenarypostapi,getpackages,loadData,itenarygetapi,getiternarybyid,itenaryupdateapi,PUT_ITENARY,POST_ITENARY,GET_ITENARY_BYID,GET_ITENARY,GET_ALL_PACKAGES} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import {getData,postData1,putData1} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser'
/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw,ContentState, convertFromHTML } from 'draft-js';
/* import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js' */



var condition=false;
class Itenary extends Component {
    constructor(props) {
        super(props);
       this.state = {
          validated:false,
          packageId: 1,
          dayNumber: 0,
          summary:null,
          iternaryDescription:null,
          benefitTags:null,
          packagePlaceIds: null,
          editData:[],
          packages:[],
          itenaries:[],
          editorState:EditorState.createEmpty()
           
       }
    }

    /* async loadtabledata()
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
        debugger
      this.props.getData(action.GET_ITENARY,GET_ITENARY)
      this.props.getData(action.GET_ALL_PACKAGES,GET_ALL_PACKAGES);
      
        /*  let packages1=await loadData(getpackages);
        this.setState({
              packages:packages1
        })
 */
        let itenary1=await loadData(itenarygetapi);
        this.setState({
              itenaries:itenary1
        })
     } 
    packageOperation(event)
    {
      this.setState({
            packageId:event.target.value
        })
    }
    daynumberOpearation(event)
    {
   this.setState({
            dayNumber:event.target.value
        })
    }
    summaryOpearation (event)
    {
  this.setState({
            summary:event.target.value
        })
    }
    itenarydescriptionOpearation (event)
    {
  this.setState({
       iternaryDescription:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })
    }
    benfitstagOpearation (event)
    {
  this.setState({
            benefitTags:event.target.value
        })
    }
    plackageplaceidsOpearation (event)
    {
  this.setState({
            packagePlaceIds:event.target.value
        })
    }
    onEditorStateChange = (editorState) => {
        this.setState({
              editorState,
            });
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
        
        let url=GET_ITENARY_BYID+id;
        this.props.getData(action.GET_ITENARY_BYID,url)
        let editdata=this.props.getitenarybyid;
     
        /*  this.setState({
            editData:editdata
        }) */

        this.setState({
            packageId:editdata.packageId,
            dayNumber:editdata.dayNumber,
            summary:editdata.summary,
            benefitTags:editdata.benefitTags,
            packagePlaceIds:editdata.packagePlaceIds,
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(editdata.iternaryDescription)
                )
              )

        })
    }
     async postEditedData()
    {
        debugger
        
        const obj={
            itenaryId:parseInt(this.state.editData.itenaryId),
            packageId:parseInt(this.state.packageId),
            dayNumber:parseInt(this.state.dayNumber) ,
            summary:this.state.summary,
            iternaryDescription:this.state.iternaryDescription,
            benefitTags:this.state.benefitTags,
            packagePlaceIds:this.state.packagePlaceIds
           }

        let editurl=itenaryupdateapi+this.state.editData.itenaryId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    }
     async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            itenaryId: 0,
            packageId:parseInt(this.state.packageId),
            dayNumber:parseInt(this.state.dayNumber) ,
            summary:this.state.summary,
            iternaryDescription:this.state.iternaryDescription,
            benefitTags:this.state.benefitTags,
            packagePlaceIds:this.state.packagePlaceIds
              }

              this.props.postData1(action.POST_ITENARY,POST_ITENARY,obj)
            /*  let message=await  postData(obj,itenarypostapi,'Post');
             
             alert (message);
             window.location.reload(); *///page refresh
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
            if(this.state.editData.itenaryId == undefined)
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
            editData:[],
            editorState:EditorState.createEmpty()

        })
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
                            </span> Itenary
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Itenary
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">itenary</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Package</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.packageOperation(e)}>
                                                       {this.props.packages.map(obj=>
                                                      <option value={obj.packageId}>{obj.packageName}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Day Number</label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" defaultValue={this.props.getitenarybyid.dayNumber}  class="form-control" onChange={(e)=>this.daynumberOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Summary</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text"  defaultValue={this.props.getitenarybyid.summary} class="form-control" onChange={(e)=>this.summaryOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">BenfitTags</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.props.getitenarybyid.benefitTags} class="form-control" onChange={(e)=>this.benfitstagOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">package PlaceIds</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.props.getitenarybyid.packagePlaceIds}  class="form-control" onChange={(e)=>this.plackageplaceidsOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                                                    
                                                    <div class="col-sm-12">
                                                       {/*  <textarea required defaultValue={this.state.viewData.countryDesc} class="form-control" id="placeTypeDescription" rows="4" onChange={(e)=>this.countrydescriptionOperation(e)}></textarea> */}
                                                       <Editor
                                                 editorState={this.state.editorState}
                                                 wrapperClassName="demo-wrapper"
                                                 editorClassName="demo-editor"
                                                 onEditorStateChange={this.onEditorStateChange}
                                                 onChange={(e)=>this.itenarydescriptionOpearation(e)}
                                                      />
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
                                        Header:"Summary",
                                        accessor:"summary",
                                        
                                    },
                                  {
                                    Header: "Description",
                                    accessor: "iternaryDescription"
                                    
                                  },
                                  {
                                    Header: "BenefitTags",
                                    accessor: "benefitTags"
                                },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.itenaryId,
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
                                data={this.props.getitenary}
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
           getitenary:state.goAdvStore.getitenary,
           getitenarybyid:state.goAdvStore.getitenarybyid,
           packages:state.goAdvStore.packages
           //cities:state.goAdvStore.citybyid
           //cities:state.goAdvStore.citybyid
        }
    }
 export default connect(mapStateToProps, {getData,postData1,putData1})(Itenary);
    //export default Itenary

