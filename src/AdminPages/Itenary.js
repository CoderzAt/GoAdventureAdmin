import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { deletecountry,PUT_ITENARY,PLACETOVISIT_BYDESTINATION,POST_ITENARY, GET_ITENARY_BYID, GET_ITENARY, GET_ALL_PACKAGES,DELETE_ITENARY, GET_ITENARY_BYPACKAGEID } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'

import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData, resetData,editorState,removeErrormsg,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser'

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState, convertFromHTML,convertFromRaw } from 'draft-js';
import { Multiselect } from 'multiselect-react-dropdown';
import Displayerrormsg from '../Shared/DisplayErrorMsg'





var condition = false;
var editorstate='<div>hi<div>'
var valuefromurl
class Itenary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated:false,
            
            iternaryDescription: '<div>Hi</div>',
            editorState: EditorState.createEmpty()
        }
    }
   

    componentDidMount() {
        debugger
        var url
        if (this.props.match.params.pid !== undefined) {
            valuefromurl = parseInt(this.props.match.params.pid);
            url =GET_ITENARY_BYPACKAGEID+ valuefromurl;
            this.props.getData(action.GET_ITENARY_BYPACKAGEID, url)
        }
        else {
            this.props.getData(action.GET_ITENARY, GET_ITENARY)
        }
        this.props.getData(action.GET_ALL_PACKAGES, GET_ALL_PACKAGES);
    }
    componentDidUpdate(prevProps, prevState, snapshotValue) {
    {	      if(this.props.getitenarybyid.iternaryDescription !== prevProps.getitenarybyid.iternaryDescription) {
        if( this.props.getitenarybyid.iternaryDescription) {
            const contentBlocks = convertFromHTML(this.props.getitenarybyid.iternaryDescription);
            const contentState = ContentState.createFromBlockArray(contentBlocks);
            this.setState({
            editorState: EditorState.createWithContent(contentState)
            });
        } else {
            this.setState({
            editorState: EditorState.createEmpty()
            });
        }
        }
    }}
    
    itenarydescriptionOpearation(event)
    {
        
           this.setState({iternaryDescription:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))})
           //console.log("editor",data)
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }
    refresh(e)
    {
        e.preventDefault();
        this.props.getData(action.GET_ITENARY, GET_ITENARY)
    }
   
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_ITENARY,DELETE_ITENARY+id)
    }
    postItenarydata() {
        debugger
        const obj = {
            itenaryId: this.props.getitenarybyid.itenaryId ? this.props.getitenarybyid.itenaryId : 0,
            packageId: parseInt(this.props.getitenarybyid.packageId),
            dayNumber: parseInt(this.props.getitenarybyid.dayNumber),
            summary: this.props.getitenarybyid.summary,
            iternaryDescription: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),/* this.state.iternaryDescription *//* this.props.getitenarybyid.iternaryDescription */
            benefitTags: this.props.getitenarybyid.benefitTags,
            packagePlaceIds: this.props.getitenarybyid.packagePlaceIds,
            isDeleted: false
        };
        let url = PUT_ITENARY + this.props.getitenarybyid.itenaryId;
        if (this.props.getitenarybyid.itenaryId) {
            this.props.putData1(action.PUT_ITENARY, url, obj);
        }
        else {
            this.props.postData1(action.POST_ITENARY, POST_ITENARY, obj);
        }
        this.setState({
            editorState: EditorState.createEmpty()
          });
        this.setState({ validated: false });
    }

    handleSubmit(event) {
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
            this.postItenarydata();
        }
    }

   
    handleReset() {
        this.props.resetData(action.RESET_DATA, "getitenarybyid");
        this.setState({ validated: false });
        this.setState({
            editorState: EditorState.createEmpty()
          });
    }
    editReacord(id) {
        this.props.getData(action.GET_ITENARY_BYID, GET_ITENARY_BYID + id);

       /*  this.setState({editorState:EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML('<div>"hi rajendar"<div>')
            )
          )}) */
    }
    itenarybypackage(e)
    {
        valuefromurl=e.target.value;
        this.props.getData(action.GET_ITENARY_BYPACKAGEID,GET_ITENARY_BYPACKAGEID+e.target.value)

    }
    updateItenary = (e, paramName) => {
        debugger
        var value
        if(paramName === "iternaryDescription")
        {
           value=draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
           console.log("hi",value)
        }
         else if(paramName === "packageId")
        {
            value=e.target.value
            
            let destinationid=0
            this.props.packages.map(obj=>{
                if(obj.packageId === value*1)
                {
                    destinationid=obj.destinationId;
                }
            })

            this.props.getData(action.PLACETOVISIT_BYDESTINATION,PLACETOVISIT_BYDESTINATION+destinationid)
        

            //loop on packages with package id
        } 
        else if(paramName === "packagePlaceIds")
        {
            let data= Array.prototype.map.call(e, function(item) { return item.placeId; }).join(",");
            value=data;

        }
        else
        {
            value=e.target.value;
        }
        this.props.updatePropAccData(paramName,value, "getitenarybyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }

    

    render() {
       
        return (

            <div>

                <div class="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
                    <Sidebar />

                    <div class="main-panel">
                        <div class="content-wrapper">

                            <div class="page-header">
                                <h3 class="page-title">
                                    <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                        <i class="mdi mdi-wan"></i>
                                    </span> Itenary
                        </h3>
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>
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
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Package</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.getitenarybyid.packageId ? this.props.getitenarybyid.packageId : "0"}
                                                                    onChange={(e) => this.updateItenary(e, "packageId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.packages.map(obj =>
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
                                                                <input required type="number" min="0" step="1" oninput="validity.valid||(value='');" value={this.props.getitenarybyid.dayNumber ? this.props.getitenarybyid.dayNumber : ""}
                                                                    class="form-control"
                                                                    onChange={(e) => this.updateItenary(e, "dayNumber")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Summary</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getitenarybyid.summary ? this.props.getitenarybyid.summary : ""}
                                                                    class="form-control" onChange={(e) => this.updateItenary(e, "summary")} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">BenfitTags</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getitenarybyid.benefitTags?this.props.getitenarybyid.benefitTags:""}
                                                                    class="form-control" onChange={(e) => this.updateItenary(e, "benefitTags")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">package Places</label>
                                                            <div class="col-sm-9">
                                                            <Multiselect  options={this.props.placetovisitbydestination} displayValue={"placeName"} 
                                                    class="form-control" onSelect={(e)=>this.updateItenary(e, "packagePlaceIds")} onRemove={(e)=>this.updateItenary(e, "packagePlaceIds")} /> 
                                                                {/* <input required type="text" value={this.props.getitenarybyid.packagePlaceIds ? this.props.getitenarybyid.packagePlaceIds : ""}
                                                                    class="form-control" onChange={(e) => this.updateItenary(e, "packagePlaceIds")} /> */}
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
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div class="row" style={{ margin: "auto", textAlign: "center"/* marg:auto;text-align: center} */ }}>
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
                                            <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Package</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={valuefromurl?valuefromurl:"0"}
                                                                    onChange={(e) => this.itenarybypackage(e)}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.packages.map(obj =>
                                                                        <option value={obj.packageId}>{obj.packageName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        </div>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[
                                                {
                                                    Header: "Summary",
                                                    accessor: "summary",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Description",
                                                    accessor: "iternaryDescription",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "BenefitTags",
                                                    accessor: "benefitTags",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }
                                                },
                                                {
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: '',
                                                    accessor: d => d.itenaryId,
                                                    maxWidth: 300,
                                                    Cell: row => (
                                                        <div className="template-demo">
                                                            <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                <i class="mdi mdi-pencil-outline"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
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
        getitenary: state.goAdvStore.getitenary,
        getitenarybyid: state.goAdvStore.getitenarybyid,
        packages: state.goAdvStore.packages,
        geteditorState:state.goAdvStore.geteditorState,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData,
        placetovisitbydestination:state.goAdvStore.placetovisitbydestination
        //cities:state.goAdvStore.citybyid
        //cities:state.goAdvStore.citybyid
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData,editorState,removeErrormsg ,deleteRecord})(Itenary);
    //export default Itenary

