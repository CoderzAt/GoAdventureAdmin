import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import { Link} from "react-router-dom";
import 'react-table-v6/react-table.css';
import {postData,destinationpostapi,loadData,getdestinations,getdestinationbyid, destinationupdateapi,GET_DESTINATION_BYID,GET_DESTINATION,POST_DESTINATION,PUT_DESTINATION,DELETE_DESTINATION} from '../Shared/Services'
import Sidebar from './Sidebar'

import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg, putDataWithFile,postDataWithFile,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'




class Destination extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           destinationname:null,
           description:null,
           title:null,
           promoimage:null,
           formFile:null,
           destinations:[],
           formFile:{},
           formFilename:"",
           editData:[]
       }
    }
    componentWillMount()
    {
      this.props.removeErrormsg()

    }
   componentDidMount()
    {
     this.props.getData(action.GET_DESTINATION,GET_DESTINATION)
    }
    refresh(e)
    {
        e.preventDefault();
        this.props.getData(action.GET_DESTINATION,GET_DESTINATION)
    }
    postDestinationdata()
    {
     
        debugger
    const obj = {
      DestinationId:this.props.getdestinationbyid.destinationId?this.props.getdestinationbyid.destinationId:0,
                DestinationName:this.props.getdestinationbyid.destinationName,
                Description:this.props.getdestinationbyid.description,
                Title:this.props.getdestinationbyid.title,
                //PromoImage: "image.jpg",
                isDeleted: false,
                formFile: ""
                //promoImage:this.props.getdestinationbyid.promoimage,
                //formFile:this.state.formFile
       };
       var bodyFormData = new FormData();
       bodyFormData.set('DestinationId', this.props.getdestinationbyid.destinationId?this.props.getdestinationbyid.destinationId:0);
       bodyFormData.set('DestinationName', this.props.getdestinationbyid.destinationName);
       bodyFormData.set('Description', this.props.getdestinationbyid.description);
       bodyFormData.set('Title', this.props.getdestinationbyid.title);
       //bodyFormData.set('PromoImage', this.state.formFile.name);
       bodyFormData.set('isDeleted', false);
       bodyFormData.append('formFile', this.state.formFile);
    let url = PUT_DESTINATION+this.props.getdestinationbyid.destinationId;
    if (this.props.getdestinationbyid.destinationId) {
        //this.props.putData1(action.PUT_DESTINATION,url,obj);
        this.props.putDataWithFile(action.PUT_DESTINATION,url,bodyFormData);
    }
    else {
        this.props.postDataWithFile(action.POST_DESTINATION,POST_DESTINATION,bodyFormData);
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
          this.postDestinationdata();
      }

    }
    handleReset() {
      this.props.resetData(action.RESET_DATA,"getdestinationbyid");
          this.setState({ validated: false });
    }
 saveFile=(e)=>
{
debugger
  console.log(e.target.files[0])
  console.log("contentdisposition",e.target.files[0]);
  this.setState({
    formFile:e.target.files[0],
    formFilename:e.target.files[0].name
  })
  
}
editReacord(id) {
  this.props.getData(action.GET_DESTINATION_BYID, GET_DESTINATION_BYID+id)
}
updateDestination = (e, paramName) => {
  this.props.updatePropAccData(paramName,e.target.value,"getdestinationbyid");
  this.setState({ refreshflag: !this.state.refreshflag });
}
deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_DESTINATION,DELETE_DESTINATION+id)
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
                                <i class="mdi mdi-home-map-marker"></i>
                            </span>Destination
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
                                    Destination
                                </li>
                            </ul>
                        </nav>
                    </div>
               <div class="row">
                   <div class="col-12 grid-margin stretch-card">
                       <div class="card">
                           <div class="card-body">
                               <h4 class="card-title">Destination</h4>
                               <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                               <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" required value={this.props.getdestinationbyid.destinationName?this.props.getdestinationbyid.destinationName:""} class="form-control" id="placeTypeName"
                                                           onChange={(e)=>this.updateDestination(e,"destinationName")} placeholder="Name"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" required value={this.props.getdestinationbyid.title?this.props.getdestinationbyid.title:""} class="form-control" id="placeTypeName"
                                                           onChange={(e)=>this.updateDestination(e,"title")} placeholder="Title"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription"
                                                        class="col-sm-3 col-form-label">Promo Image</label>
                                                         <div class="col-sm-9">
                                                         <span class="input-group-append">
                                                         <input

                                                                  class="file-upload-browse btn btn-gradient-primary"
                                                                    type="file"
                                                                     
                                                                    onChange={this.saveFile}/>

                                                        </span>
                                                        </div>
                                                    {/* <div class="col-sm-9">
                                                        <input type="file" name="img[]" class="file-upload-default"/>
                                                        <div class="input-group col-xs-12">
                                                            <input type="text" defaultValue={this.state.editData.promoImage} class="form-control file-upload-info"
                                                                onChange={(e)=>this.promoimageOpeartion(e)} disabled="" placeholder="Upload Image"/>
                                                            <span class="input-group-append">
                                                                <button
                                                                    class="file-upload-browse btn btn-gradient-primary"
                                                                    type="button">Upload</button>
                                                            </span>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription"
                                                        class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" required value={this.props.getdestinationbyid.description?this.props.getdestinationbyid.description:""} id="placeTypeDescription"
                                                          onChange={(e)=>this.updateDestination(e,"description")}  rows="4"></textarea>
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
                               <h4 class="card-title">Destinations<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                   <div className="table-responsive">
                   <ReactTable columns={[
                                 /*   {
                                        Header: "DestinationId",
                                        accessor: "destinationId"

                                    },*/
                                  {
                                    Header: "Name",
                                    accessor: "destinationName",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }

                                  },
                                  {
                                    Header: "Title",
                                    accessor: "title",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }

                                  },
                                  {
                                    Header: "PromoImage",
                                    accessor: "promoImage",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }

                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
                                    accessor: d => d.destinationId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" value={row.value} >
                                          <Link style={{ color:'#A9A9A9'}}  to={`/admin/placetovisit/${row.value}/${"destination"}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                          </button>

                                      </div>)

                                  }
                                ]}
                                data={this.props.getdestination}
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





        </div>
     )
        }
    }
    const mapStateToProps = (state) => {
      return {
        getdestination:state.goAdvStore.getdestination,
        getdestinationbyid:state.goAdvStore.getdestinationbyid,
          /* gettraveltypebyid:state.goAdvStore.gettraveltypebyid,
          gettraveltype:state.goAdvStore.gettraveltype,*/
       message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData 
      }
    }
    export default connect(mapStateToProps, { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg, putDataWithFile,postDataWithFile,deleteRecord })(Destination);


    //export default Destination
