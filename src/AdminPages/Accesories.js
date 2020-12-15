import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import {postData,loadData,getaccessories,accessorybyid,accessoryupdateapi,accessorypostapi,GET_ALL_ACCESSORIES} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser'
/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw ,ContentState, convertFromHTML} from 'draft-js';
import TextInput from'../Shared/TextInput';

import * as validation from '../Shared/Validations'
import { connect } from 'react-redux';
import {getAccessories,getData} from '../Adminstore/actions/goAdvActions';
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
class Accessories extends Component {
    constructor(props) {
        super(props);
       this.state = {
        accessoryName:"",
        saleOrRent:"0",
        salePrice: 0,
        rentPrice: 0,
       // accessories:[],
        editData:[],
        saledisbale:"",
        rentdisable:"",
        errors:{
           }
      }
    }
 
 /* componentDidUpdate() //this is for rendering the code for every update
    {
        debugger
        //we need to keep a condition here ...if new data is submitted then only we have to call this function
       
        this.loadtabledata()  //is there any problem with hitting the api's too many times
        condition=false;
        
     } */
      componentDidMount()
     {
       //this.props.getAccessories(action.GET_ALL_ACCESSORIES,GET_ALL_ACCESSORIES)
       this.props.getData(action.GET_ALL_ACCESSORIES,GET_ALL_ACCESSORIES)
       
       
     }
    accessorynamenameOperation(event)
    {
      this.setState({
            accessoryName:event.target.value
        })
    }
   salepriceOpearation(event)
    {
        this.setState({
            salePrice:event.target.value
        })

    }
   rentpriceOpearation(event)
    {
  this.setState({
            rentPrice:event.target.value
        })
    }
    saleorrentOpearation(event)
    {
        debugger

  this.setState({
            saleOrRent:event.target.value
        })
       
       
        if(event.target.value == "sale")
        {
            this.setState({
                saledisbale:"",
                rentdisable:"true"
            })
        }
        else if(event.target.value == "rent")
        {
            this.setState({
                rentdisable:"",
                saledisbale:"true"
            })
        }
        else if(event.target.value == "both")
        {
            this.setState({
                rentdisable:"",
                saledisbale:""
            })

        }
    }

    /* deleteRecord(id)
    {
        alert("in delete id no is"+id)
        fetch(deletecountry+id, {
            method: 'DELETE'
          });

    } */
   async editReacord(id)
    {
        debugger
        alert(id)
        
        let url=accessorybyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })
        this.setState({
            accessoryName:editdata.accessoryName,
            saleOrRent:editdata.saleOrRent,
            salePrice:editdata.salePrice,
            rentPrice:editdata.rentPrice
         })

} 
    /* async postEditedData()
    {
        debugger
        
        const obj={
            countryId:this.state.viewData.countryId,
            countryName:this.state.countryname,
            countryCode:this.state.countrycode,
            countryDesc:this.state.countrydescription,
                  }

        let editurl=countryupdateapi+this.state.viewData.countryId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)

        window.location.reload();//page refresh

    }
 */     async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            accessoriesId:0,
            accessoryName:this.state.accessoryName,
            saleOrRent:this.state.saleOrRent,
            salePrice:parseInt(this.state.salePrice),
            rentPrice:parseInt(this.state.rentPrice)
              }
             let message=await  postData(obj,accessorypostapi,'Post');
             alert (message);
             window.location.reload();//page refresh
    }
    handlevalidation()
    {
        this.setState({
            errors:{
                saleOrrent:validation.selectvalidation(this.state.saleOrRent),
                accessoryName:validation.namevalidation(this.state.accessoryName)
                   }
        })
        }
    async handleSubmit(event)
    {  
         event.preventDefault();
        this.handlevalidation();
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
            if(this.state.editData.accessoriesId == undefined)
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

    handleinput(e)
    {
       alert(e.target.value)
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
                                <i class="mdi mdi-wan"></i>
                            </span>Accessories
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                Accessories
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Accessories</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                        {/* <TextInput value={this.state.countryname} defaultValue={this.state.viewData.countryName} type="text" name="countryName" onChange={(e)=>this.countrynamenameOperation(e)}/>
                                        <TextInput value={this.state.country} defaultValue={this.state.viewData.countryCode} type="text" name="countryCode" onChange={(value)=>this.countrycodeOpearation(value)}/>
                                            */}
                                          
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.accessoryName} class="form-control" onChange={(e)=>this.accessorynamenameOperation(e)}/>
                                                        <div style={{color:"red"}}>{this.state.errors.accessoryName}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">saleOrRent</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control" onChange={(e)=>this.saleorrentOpearation(e)}>
                                                         <option value={0}>Select</option>
                                                         <option value="sale">Sale</option>
                                                         <option value="rent">Rent</option>
                                                         <option value="both">Both</option>
                                                    </select>
                                                     <div style={{color:"red"}}>{this.state.errors.saleOrrent}</div>
                                                    </div>
                                            </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row" >
                                                    <label class="col-sm-3 col-form-label">SalePrice</label>
                                                    <div class="col-sm-9" >
                                                        <input required  disabled={this.state.saledisbale} type="number" defaultValue={this.state.editData.salePrice} class="form-control" onChange={(e)=>this.salepriceOpearation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">RentPrice</label>
                                                    <div class="col-sm-9">
                                                        <input required disabled={this.state.rentdisable} type="number" defaultValue={this.state.editData.rentPrice} class="form-control" onChange={(e)=>this.rentpriceOpearation(e)} />
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
                                    <h4 class="card-title">Accessories</h4>
                                    <div class="table-responsive"></div>
                                    <ReactTable columns={[
                                    {
                                        Header: "Name",
                                        accessor:"accessoryName",
                                        headerStyle:{
                                            textAlign:'left'
                                        }
                                    },
                                  {
                                    Header: "Borrowtype",
                                    accessor: "saleOrRent",
                                    headerStyle:{
                                        textAlign:'left'
                                    },
                                  },
                                  {
                                    Header: "SalePrice",
                                    accessor: "salePrice",
                                    headerStyle:{
                                        textAlign:'left'
                                    }
                                    
                                  },
                                  {
                                    Header: "RentPrice",
                                    accessor: "rentPrice",
                                    headerStyle:{
                                        textAlign:'left'
                                    }
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    headerStyle:{
                                        textAlign:'left'
                                    },
                                    accessor: d => d.accessoriesId,
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
                                data={this.props.accessories}
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
            accessories: state.goAdvStore.accessories
        }
    }
    export default connect(mapStateToProps, {getData})(Accessories);
    

    //export default Accessories

