import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,countrypostapi,getcounties,loadData,deletecountry,getcountrybyid,countryupdateapi,GET_USER_BYID,GET_COUNTRIES,GET_COUNTRY_BYID,POST_COUNTRY,PUT_COUNTRY,DELETE_COUNTRY} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw ,ContentState, convertFromHTML} from 'draft-js';
import TextInput from'../Shared/TextInput';
import { connect } from 'react-redux';
import {getData,postData1,putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord,removedata} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'
import { Redirect } from 'react-router'
var condition=false;
var editorstate='<div>hi<div>';
class Country extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           countryname:null,
           countrydescription:'<div>hi<div>',
           countrycode:null,
           countries:[],
           viewData:[],
           editorState:EditorState.createEmpty()
       }
    } 
    componentWillMount()
    {
      this.props.removeErrormsg()
      this.props.removedata("getcountrybyid")
  
    }
    componentDidMount() {
      this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)
      this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))
    }
    refresh(e)
  {
      e.preventDefault();
      this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)
  }
    componentDidUpdate(prevProps, prevState, snapshotValue) {
      if(this.props.getcountrybyid.countryDesc !== prevProps.getcountrybyid.countryDesc) {
        if( this.props.getcountrybyid.countryDesc) {
          const blocksFromHtml = htmlToDraft(this.props.getcountrybyid.countryDesc);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

          this.setState({
            editorState: EditorState.createWithContent(contentState)
          });
        } else {
          this.setState({
            editorState: EditorState.createEmpty()
          });
        }
      }
    }
    countrydescriptionOperation(event) {
        //alert(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        this.setState({
            countrydescription:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })
    }
    onEditorStateChange = (editorState) => {
      this.setState({
          editorState
      });
    }
    

    postCountrydata() {
        debugger
        const obj = {
          countryId:this.props.getcountrybyid.countryId?this.props.getcountrybyid.countryId:0,
          countryName:this.props.getcountrybyid.countryName,
          countryCode:this.props.getcountrybyid.countryCode,
          countryDesc:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
          createdBy:this.props.getcountrybyid.countryId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName,
          modifiedBy:this.props.getcountrybyid.countryId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null,
          isDeleted: false
        };
        let url = PUT_COUNTRY+this.props.getcountrybyid.countryId;
        if (this.props.getcountrybyid.countryId) {
            this.props.putData1(action.PUT_COUNTRY,url,obj);
        } else {
            this.props.postData1(action.POST_COUNTRY,POST_COUNTRY,obj);
        }
        this.setState({
            editorState: EditorState.createEmpty()
          });
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
            this.postCountrydata();

        }
        this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)

    }

    handleReset()
    {
        this.props.resetData(action.RESET_DATA,"getcountrybyid");
        this.setState({ validated: false });

        this.setState({
            editorState: EditorState.createEmpty()
          });
    }
    editReacord(id) {
      this.props.getData(action.GET_COUNTRY_BYID,GET_COUNTRY_BYID+id);
    }

    updateCountry = (e, paramName) => {

        var value
        if(paramName === "countryDesc")
        {
            value=draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        }
        else
        {
            value=e.target.value
        }
        this.props.updatePropAccData(paramName,value,"getcountrybyid");
        this.setState({ refreshflag:!this.state.refreshflag });
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_COUNTRY,DELETE_COUNTRY+id)
    }
    render() {
         editorstate=EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(this.props.getcountrybyid.countryDesc?this.props.getcountrybyid.countryDesc:'<div><div>')
            )
          )

	    return (
         <div>

        <div class="container-fluid page-body-wrapper" style={{paddingTop:80}}>
        {/* {localStorage.getItem("GoAdventureLoginToken") === null?<Redirect to="/admin/login-1"/>:null} */}
            <Sidebar/>

            <div class="main-panel">
                <div class="content-wrapper">

                     <div class="page-header">
                        <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                <i class="mdi mdi-wan"></i>
                            </span> Country
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Country
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Country</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)}  onReset={(e)=>this.handleReset(e)} >
                                    <div class="row">
                                        {/* <TextInput value={this.state.countryname} defaultValue={this.state.viewData.countryName} type="text" name="countryName" onChange={(e)=>this.countrynamenameOperation(e)}/>
                                        <TextInput value={this.state.country} defaultValue={this.state.viewData.countryCode} type="text" name="countryCode" onChange={(value)=>this.countrycodeOpearation(value)}/>
                                            */}

                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getcountrybyid.countryName?this.props.getcountrybyid.countryName:""}
                                                        class="form-control" onChange={(e)=>this.updateCountry(e,"countryName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Code</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getcountrybyid.countryCode?this.props.getcountrybyid.countryCode:""}
                                                        class="form-control" onChange={(e)=>this.updateCountry(e,"countryCode")} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-12">
                                                    <div>

                                                       {/*  <textarea required defaultValue={this.state.viewData.countryDesc} class="form-control" id="placeTypeDescription" rows="4" onChange={(e)=>this.countrydescriptionOperation(e)}></textarea> */}
                                                       <Editor
                                                 editorState={this.state.editorState}
                                                 wrapperClassName="demo-wrapper"
                                                 editorClassName="demo-editor"
                                                 onEditorStateChange={this.onEditorStateChange}
                                                 //onChange={(e)=>this.updateCountry(e,"countryDesc")}
                                                      />

                                                      </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div dangerouslySetInnerHTML={{__html:this.props.getcountrybyid.countryDesc}} /> */}

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
                                    <h4 class="card-title">Countries<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                  /* {
                                        Header: "CountryId",
                                        accessor:"countryId",
                                        headerStyle:{
                                            textAlign:'left'
                                        }
                                    },*/
                                  {
                                    Header: "Name",
                                    accessor: "countryName",
                                    headerStyle:{
                                        textAlign:'left',
                                        fontWeight: 'bold'
                                    },
                                  },
                                  {
                                    Header: "Code",
                                    accessor: "countryCode",
                                    headerStyle:{
                                        textAlign:'left',
                                        fontWeight: 'bold'
                                    }

                                  },
                                  {
                                    Header:"Description",
                                    accessor:"countryDesc",
                                    headerStyle:{
                                        textAlign:'left',
                                        fontWeight: 'bold',

                                    },
                                    Cell: row=> (<div dangerouslySetInnerHTML={{__html: row.value}} />)

                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
                                    headerStyle:{
                                        textAlign:'left'
                                    },
                                    accessor: d => d.countryId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-icon" value={row.value} >
                                          <Link  to={`/admin/state/${row.value}`}>States</Link>
                                          </button>
                                          
                                      </div>)

                                  }

                                ]}
                                data={this.props.countries}
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
            countries: state.goAdvStore.countries,
            getcountrybyid:state.goAdvStore.getcountrybyid,
            message: state.goAdvStore.message,
            getuserbyidprofile:state.goAdvStore.getuserbyidprofile,
            messageData: state.goAdvStore.messageData
            
        }
    }
    export default connect(mapStateToProps, {getData,postData1,removedata,putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord})(Country);



    //export default Country
