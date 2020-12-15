import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
import {placetypepostapi,postData,getplacetypes,loadData,getplacetypebyid,placetypeupdateapi} from '../Shared/Services'
import {namevalidation} from '../Shared/Validations'


class PlaceType extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           placetypename:"",
           placetypedescription:"",
           placetypesT:[],
           editData:[],
           errors:{
               name:"",
               description:""
           }
         }
    }
    async componentDidMount()
    {
     let placetypes=await loadData(getplacetypes)
     this.setState({
       placetypesT:placetypes
     })
    }

    placetypenameOperation(event)
    {
    this.setState({
            placetypename:event.target.value
        })
     }
    placetypedescriptionOperation(event)
    {
   this.setState({
            placetypedescription:event.target.value
        })
     }

    async editReacord(id)
    {
        
        let url=getplacetypebyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

        this.setState({
            placetypename:editdata.placeTypeName,
            placetypedescription:editdata.placeTypeDescription,
        })
    }

    async postEditedData()
    {
        debugger
        
        const obj={
            placeTypeId:this.state.editData.placeTypeId,
            placeTypeName:this.state.placecetypename,
            placeTypeDescription:this.state.placetypedescription
            }

        let editurl=placetypeupdateapi+this.state.editData.placeTypeId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)
        window.location.reload();//page refresh
    }
   

   async postDatatoApi()
    {
      const obj={
               placeTypeId: 0,
               placeTypeName:this.state.placetypename,
               placeTypeDescription:this.state.placetypedescription
              }
             let message=await  postData(obj,placetypepostapi,'Post');
             alert (message);
             window.location.reload();//page refresh
    }
     validateForm(errors){
        debugger
       let valid = true;
       Object.values(errors).forEach(val => val.length > 0 && (valid = false));
       return valid;
     } 
    handlevalidations()
    { debugger
       this.state.errors.name=namevalidation(this.state.placetypename)
    }

    async handleSubmit(event)
    { 
        event.preventDefault();
          this.handlevalidations()
   debugger
        const form = event.currentTarget;
        console.log("checkform",form.checkValidity())
        if(form.checkValidity() === false || this.validateForm(this.state.errors) === false)
        {
          event.preventDefault();
          event.stopPropagation();
        }
        else
        {
            event.preventDefault();
            if(this.state.editData.placeTypeId == undefined)
            {
          this.postDatatoApi()
            }
            else{
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
            editData:[]
        })
    }

    render() {
	    return (
        <div>
        <div class="container-scroller">
   </div>
  <AdminHeader/>
   <div class="container-fluid page-body-wrapper" style={{paddingTop:80}}>
       <Sidebar/>
       
       <div class="main-panel">
           <div class="content-wrapper">
           <div class="page-header">
                        <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                <i class="mdi mdi-home-map-marker"></i>
                            </span>Place Type
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Place Type
                                </li>
                            </ul>
                        </nav>
                    </div>
               <div class="row">
                   <div class="col-12 grid-margin stretch-card">
                       <div class="card">
                           <div class="card-body">
                               <h4 class="card-title">Place Type</h4>
                               <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                               <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName" class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" required defaultValue={this.state.editData.placeTypeName} class="form-control" id="placeTypeName" onChange={(e)=>this.placetypenameOperation(e,this.state.palcetypename)} placeholder="Name"/>
                                                     <div style={{color:"red"}}>{this.state.errors.name}</div>
                                                    </div>
                                                </div>
                                                </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" required defaultValue={this.state.editData.placeTypeDescription} id="placeTypeDescription" rows="4" onChange={(e)=>this.placetypedescriptionOperation(e)}></textarea>
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
                   <div className="table-responsive">
                   <ReactTable columns={[
                                    {
                                        Header: "PlaceTypeId",
                                        accessor: "placeTypeId"
                                        
                                    },
                                  {
                                    Header: "PlaceTypeName",
                                    accessor: "placeTypeName"
                                    
                                  },
                                  {
                                    Header: "PlaceTypeDescription",
                                    accessor: "placeTypeDescription"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.placeTypeId,
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
                                data={this.state.placetypesT}
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
		{/* <div style={{paddingLeft:400,paddingTop:110,backgroundColor:"black"}} >
            <div class="card" style={{width:600 }}>
  <div class="card-body">
    <h3 class="card-title">New Placetype</h3>
    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)}>
                  <Form.Group >
                    <label htmlFor="placetypename">PlaceTypeName</label>
                    <Form.Control   type="text" id="placetypename"  onChange={(e)=>this.placetypenameOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="placetypedescription">PlacetypeDescription</label>
                    <textarea required class="form-control" id="placetypedescription" rows="3" onChange={(e)=>this.placetypedescriptionOperation(e)}></textarea>
                  </Form.Group>
                 
                  <button type="submit" class="btn btn-primary" >submit</button>
    </Form>
  </div>
  
</div>
 */}        </div>
     )
        }
    }
    export default PlaceType

