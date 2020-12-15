import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import { Link} from "react-router-dom";
import 'react-table-v6/react-table.css';
import {postData,destinationpostapi,loadData,getdestinations,getdestinationbyid, destinationupdateapi} from '../Shared/Services'
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'


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
           editData:[]
       }
    }

   async componentDidMount()
    {
      let destination=await loadData(getdestinations)
      this.setState({
        destinations:destination
      })
    }
    destinantionnameOperation(event)
    {
      this.setState({
            destinationname:event.target.value
        })
    }
    descriptionOperation(event)
    {
   this.setState({
            description:event.target.value
        })

    }
    titleOpearation(event)
    {
  this.setState({
            title:event.target.value
        })
    }
    promoimageOpeartion(event)
    {
        this.setState({
            promoimage:event.target.value
        })
    }
    async editReacord(id)
    {
        
        let url=getdestinationbyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

        this.setState({
          destinationname:editdata.destinationName,
          description:editdata.description,
          title:editdata.title,
          promoimage:editdata.promoImage
         })
    }

    async postEditedData()
    {
        debugger
        
        const obj={
          destinationId:this.state.editData.destinationId,
          destinationName:this.state.destinationname,
          description:this.state.description,
          title:this.state.title,
          promoImage:this.state.promoimage
          }
        let editurl=destinationupdateapi+this.state.editData.destinationId;
        let editeddata=await postData(obj,editurl,'Put')
        alert(editeddata)
        window.location.reload();//page refresh
    }
    async postDatatoApi()
    {

  const obj={
                destinationId:0,
                destinationName:this.state.destinationname,
                description:this.state.description,
                title:this.state.title,
                promoImage:this.state.promoimage,
                formFile:this.state.formFile
                }
             let message=await  postData(obj,destinationpostapi,'Post');
             alert (message);
             window.location.reload();//page refresh
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
            if(this.state.editData.destinationId == undefined)
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
        editData:[]
      })
    }
 saveFile=(e)=>
{
debugger
  console.log(e.target.files[0])
  console.log("contentdisposition",e.target.files[0])

  this.setState({
    formFile:e.target.files[0]
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
                            </span>Destination
                        </h3>
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
                                                        <input type="text" required defaultValue={this.state.editData.destinationName} class="form-control" id="placeTypeName"
                                                           onChange={(e)=>this.destinantionnameOperation(e)} placeholder="Name"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" required defaultValue={this.state.editData.title} class="form-control" id="placeTypeName"
                                                           onChange={(e)=>this.titleOpearation(e)} placeholder="Title"/>
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
                                                        <textarea class="form-control" required defaultValue={this.state.editData.description} id="placeTypeDescription"
                                                          onChange={(e)=>this.descriptionOperation(e)}  rows="4"></textarea>
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
                               <h4 class="card-title">Destinations</h4>
                   <div className="table-responsive">
                   <ReactTable columns={[
                                    {
                                        Header: "DestinationId",
                                        accessor: "destinationId"
                                        
                                    },
                                  {
                                    Header: "DestinationName",
                                    accessor: "destinationName"
                                    
                                  },
                                  {
                                    Header: "Title",
                                    accessor: "title"
                                    
                                  },
                                  {
                                    Header: "PromoImage",
                                    accessor: "promoImage"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.destinationId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => {  this.deleteRecord(row.value)}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" value={row.value} >
                                          <Link style={{ color:'#A9A9A9'}}  to={`/admin/placetovisit/${row.value}/${"destination"}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                          </button>
                                         
                                      </div>)

                                  }
                                ]}
                                data={this.state.destinations}
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
        
        


        {/* <div>
		<div style={{paddingLeft:400,paddingTop:110,backgroundColor:"black"}} >
            <div class="card" style={{width:600 }}>
  <div class="card-body">
    <h3 class="card-title">New Destination</h3>
    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)}>
                  <Form.Group >
                    <label htmlFor="destinationname">DestinationName</label>
                    <Form.Control   type="text" id="destinationname"  onChange={(e)=>this.destinantionnameOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="description">Description</label>
                    <textarea required class="form-control" id="description" rows="3" onChange={(e)=>this.descriptionOperation(e)}></textarea>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="title">Title</label>
                    <Form.Control required type="title" id="title" onChange={(e)=>this.titleOpearation(e)}  />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="promoimage">PromoImage</label>
                    <Form.Control required type="promoimage" id="promoimage" onChange={(e)=>this.promoimageOpeartion(e)}/>
                  </Form.Group>
                  <button type="submit" class="btn btn-primary" >submit</button>
    </Form>
  </div>
  
</div>
        </div>
        <h2>Destination Table</h2>
        <div className="table-responsive" style={{ paddingTop: '20px' }}>
        <ReactTable columns={[
                                    {
                                        Header: "DestinationId",
                                        accessor: "destinationId"
                                        
                                    },
                                  {
                                    Header: "DestinationName",
                                    accessor: "destinationName"
                                    
                                  },
                                  {
                                    Header: "Title",
                                    accessor: "title"
                                    
                                  },
                                  {
                                    Header: "PromoImage",
                                    accessor: "promoImage"
                                    
                                  }
                                ]}
                                data={this.state.destinations}
                                showPagination={true}
                                defaultPageSize={10}
                                
                         />
        </div>
        </div> */}
        </div>
     )
        }
    }
    export default Destination

